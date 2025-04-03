export const getPageUrl = (
  domain: string,
  pathName = "/",
  options?: { queryParams?: Record<string, unknown> }
) => {
  const { queryParams } = options ?? {};
  const pageUrl = new URL(pathName, domain);

  if (queryParams) {
    Object.entries(queryParams).forEach(([name, value]) => {
      pageUrl.searchParams.append(name, String(value));
    });
  }

  return pageUrl.toString();
};
