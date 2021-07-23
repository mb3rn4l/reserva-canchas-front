import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/div/div/ul/li[1]/a'));
    linkProducto = element(by.xpath('/html/body/app-root/app-navbar/nav/div/div/ul/li[2]/a'));
    linkReservas = element(by.xpath('/html/body/app-root/app-navbar/nav/div/div/ul/li[3]/a'));

    async clickBotonProductos() {
        await this.linkProducto.click();
    }

    async clickBotonReservas() {
        await this.linkReservas.click();
    }
}
