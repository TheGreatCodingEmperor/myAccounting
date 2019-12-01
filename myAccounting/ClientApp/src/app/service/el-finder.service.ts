import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElFinderService {

  private root = `http://localhost:61705/el-finder/file-system/connector?cmd=`;
  public multiSelect = [];

  constructor(
    private http:HttpClient
  ) { }

  /**
   * 
   * @param target 目的folder EX: v1_ + base64(/file.txt) + 0 
   */
  public ls<T>(target: string): Observable<T> {
    let url = this.root + 'ls&target=' + target;
    return this.http.get<T>(url);
  }

  /**
   * 
   * @param target 
   * @param init 
   * @param tree 
   */
  public openDir<T>(target: string, init: number, tree: number): Observable<T> {
    let url = this.root + 'open&target=' + target + '&init=' + init + '&tree=' + tree;
    return this.http.get<T>(url);
  }

  /**
   * 印出child directory
   * @param target 
   */
  public tree<T>(target: string): Observable<T> {
    let url = this.root + 'tree&target=' + target;
    return this.http.get<T>(url);
  }

  /**
   * 刪除
   * @param targets File EX:v1_ + base64(/file.txt) + 0 
   */
  public rm<T>(targets: string[]): Observable<T> {
    let url = this.root + 'rm';
    for (let tg of targets) {
      url = url + '&targets[]=' + tg;
    }
    return this.http.get<T>(url);
  }

  public mkfile<T>(target: string, name: string): Observable<T> {
    let url = this.root + 'mkfile&target=' + target + '&name=' + name;
    return this.http.get<T>(url);
  }

  public mkdir<T>(target: string, name: string, dirs: string[]): Observable<T> {
    let url = this.root + 'mkdir&target=' + target + '&name=' + name;
    for (let dir of dirs) {
      url = url + '&dirs[]=' + dir;
    }
    return this.http.get<T>(url);
  }

  public upload<T>(target: string, overwrite: number, upload_path: string[], files: Blob): Observable<T> {
    let url = this.root + 'upload&target=' + target + '&overwrite' + overwrite + '&upload_path' + upload_path;
    let formData = new FormData;
    formData.append('files', files);

    return this.http.post<T>(url, formData);
  }

  /**
   * Compress files
   * @param target : $ v1_, 壓縮到哪裡
   * @param name :$ file, 壓縮後名字
   * @param type : $ application/zip, 壓縮方式
   * @param targets : $ ["v1_hash(file1)0","v1_hash(file2)0"], 加入壓縮的檔案
   */
  public archive(target: string, name: string, type: string, targets: string[]): Observable<object> {
    let url = this.root + 'archive&target=' + target + '&name=' + name + '&type=' + type;
    for (let tg of targets) {
      url = url + '&targets[]=' + tg;
    }
    return this.http.get<object>(url);
  }

  /**
   * Extract file
   * @param target : $ v1_hash(target.zip)0, zip file to extract
   * @param createDir :$ 1=true,$ other=false, create new dir for extracted files
   */
  public extract(target: string, createDir: number): Observable<object> {
    let url = this.root + 'extract&target=' + target + '&makedir=' + createDir;
    return this.http.get<object>(url);
  }

  /**
   * copy
   * @param targets $ ["v1_hash(file1)0","v2_hash(file2)0"]
   */
  public duplicate<T>(targets: string[]): Observable<T> {
    let params = '';
    for (let tg of targets) {
      params = params + '&targets[]=' + tg;
    }
    return this.http.get<T>(this.root + 'duplicate' + params);
  }

  /**
   * get file
   * @param target : v1_hash(file)0
   * @param download : $ 1=download, 0 = content
   */
  public file(target: string, download: number): Observable<HttpEvent<Blob>> {
    let url = this.root + 'file' + '&target=' + target + '&download=' + download;
    return this.http.request(new HttpRequest(
      'GET',
      `${this.root}file&target=${target}&download=${download}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }

  public put<T>(target: string, content: Blob): Observable<T> {
    let url = this.root + '&target=' + target + '&content=' + content;
    return this.http.get<T>(url);
  }

  public rename<T>(target: string, name: string): Observable<T> {
    let url = this.root + 'rename&target=' + target + '&name=' + name;
    return this.http.get<T>(url);
  }

  public paste<T>(dst: string, targets: string[], cut: number): Observable<T> {
    let url = this.root + 'paste&dst=' + dst + '&cut=' + cut;
    for (let i of targets) {
      url = url + '&targets[]=' + i;
    }
    return this.http.get<T>(url);
  }
}
