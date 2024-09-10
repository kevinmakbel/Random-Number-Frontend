const url = import.meta.env.VITE_RANDOM_NUMBER_URL ?? 'http://localhost:3000/random-number'
type Data = {
    value: number
}
export async function getRandomNumber(): Promise<[Error?,Data?]> {
    try {
    const response = await fetch(url, {
        method: 'POST',
      });
      if (!response.ok) {
        return [new Error(`Something went wrong when fetching the data: ${response.statusText}`)]
      }

      const json = await response.json();
      return [undefined, json]
    } catch (error) {
      if (error instanceof Error) return [error]
      return [new Error('Something went wrong')]
      
    }
}