export const symbolLookup = (data) =>
  new Map(
    data.map((item) => [
      parseInt(item.ScripCode),
      {
        symbol: item.Symbol ?? item.Name,
        fullName: item.FullName ?? null,
        _id: item._id ?? null,
      },
    ])
  );
