export async function crawlWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.statusText}`);
    }
    const text = await response.text();
    return text;
  } catch (error) {
    throw new Error(`Failed to crawl website: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}