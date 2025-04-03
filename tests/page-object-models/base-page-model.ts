import { faker } from "@faker-js/faker";
import type { Page } from "@playwright/test";

export interface TBasePageModelConstructor {
  page: Page;
}

export abstract class BasePageModel {
  protected page: Page;
  protected domain: string;
  protected pathName: string;
  protected factory = faker;

  constructor(params: TBasePageModelConstructor) {
    this.page = params.page;
  }

  async goto(options?: unknown) {
    const url = new URL(this.pathName, this.domain);

    return this.page.goto(url.toString(), {
      waitUntil: "load",
    });
  }

  async getDataLayer(): Promise<undefined | unknown[]> {
    const dataLayer = await this.page.evaluate(() => {
      if (typeof window === "undefined") return;

      return window.dataLayer;
    });

    return dataLayer;
  }
}
