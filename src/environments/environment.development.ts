// const HOST = '192.168.3.11';
const HOST = 'localhost'
const IS_LOCAL_API = true;

export const environment = {
   production: false,
   host: HOST,
   apiPort: '3000',
   get apiUrl(): string {
      if (IS_LOCAL_API) return `http://${this.host}:${this.apiPort}/`;
      return '';
   }
};
