export async function processPromisesBatch(items, limit, fn) {
  const batches = [];
  let result = [];

  // Split the items into batches
  for (let i = 0; i < items.length; i += limit) {
    batches.push(items.slice(i, i + limit));
  }

  // Process batches serially
  for (const batch of batches) {
    const processedBatch = await fn(batch);
    result = result.concat(processedBatch);
  }

  return result;
}