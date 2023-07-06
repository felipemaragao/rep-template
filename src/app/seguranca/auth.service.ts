import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = environment.apiUrl + '/oauth2/token'
  oauthAuthorizeUrl = environment.apiUrl + '/oauth2/authorize'
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  login() {
    console.info("Iniciando Login")
    const state = this.gerarStringAleatoria(40);
    const codeVerifier = this.gerarStringAleatoria(128);

    localStorage.setItem('state', state);
    localStorage.setItem('codeVerifier', codeVerifier);
    console.info("codeVerifier: " + codeVerifier)

    const challengeMethod = 'S256'
    const codeChallenge = CryptoJS.SHA256(codeVerifier)
                            .toString(CryptoJS.enc.Base64)
                            .replace(/\+/g, "-")
                            .replace(/\//g, "_")
                            .replace(/=+$/, "");

    const redirectURI = encodeURIComponent(environment.oauthCallbackUrl);

    const clientId = 'angular'
    const scope = 'read+write'
    const responseType = 'code'

    const params = [
      'response_type=' + responseType,
      'client_id=' + clientId,
      'state=' + state,
      'redirect_uri=' + redirectURI,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=' + challengeMethod,
      'scope=' + scope,
    ]
    console.info("Obtendo code para login chamando: "  + this.oauthAuthorizeUrl + '?' + params.join('&'))

    window.location.href = this.oauthAuthorizeUrl + '?' + params.join('&');
  }

  obterNovoAccessTokenComCode(code: string, state: string): Promise<any> {
    console.info("**** obterNovoAccessTokenComCode")
    const stateSalvo = localStorage.getItem('state');

    if (stateSalvo !== state) {
      return Promise.reject(null);
    }

    const codeVerifier = localStorage.getItem('codeVerifier')!;

    const payload = new HttpParams()
    .append('grant_type', 'authorization_code')
    .append('code', code)
    .append('redirect_uri', environment.oauthCallbackUrl)
    .append('code_verifier', codeVerifier);

  const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    console.info("payload:" + payload)
    console.info("headers:" + headers)


  return this.http.post<any>(this.oauthTokenUrl, payload, { headers })
    .toPromise()
    .then((response: any) => {
      this.armazenarToken(response['access_token']);
      this.armazenarRefreshToken(response['refresh_token']);
      console.log('Novo access token criado!');

      localStorage.removeItem('state');
      localStorage.removeItem('codeVerifier');

      return Promise.resolve(null);
    })
    .catch((response: any) => {
      console.error('Erro ao gerar o token com o code.', response);
      return Promise.resolve();
    });

  }

  obterNovoAccessToken(): Promise<void> {
    console.info("o valor do refres é: " + localStorage.getItem('refreshToken')!)

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const payload = new HttpParams()
      .append('grant_type', 'refresh_token')
      .append('refresh_token', localStorage.getItem('refreshToken')!)


    return this.http.post<any>(this.oauthTokenUrl, payload,
      { headers })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token'])
        console.log('Novo access token criado!');

        return Promise.resolve();
      })
      .catch((response: any) => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve();
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  public armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  public carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  private armazenarRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  private gerarStringAleatoria(tamanho: number) {
    let resultado = '';
    //Chars que são URL safe
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < tamanho; i++) {
      resultado += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return resultado;
  }

  logout() {
    console.info("chamada do logout redirecionando para " + environment.apiUrl + '/logout?returnTo=' + environment.logoutRedirectToUrl)
    this.limparAccessToken();
    localStorage.clear();
    window.location.href = environment.apiUrl + '/logout?returnTo=' + environment.logoutRedirectToUrl;
  }
}
