import { waitFor } from '~/lib/time';

export default async function getDummyData(length: number = 10) {
  return waitFor(
    Array.from({ length }).map((_, i) => ({
      id: i + 1,
      provider: { name: `Dummy Provider` },
      tariff: { name: `Dummy Tariff ${i}` },
    })),
    600,
    980,
  );
}
