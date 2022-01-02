import convertFeatureMember from './convertFeatureMember'

// warn: it should return unpredictable results when is passed invalid feature member

it('should convert valid feature member', () => {
  const validFeatureMember = [
    {
      GeoObject: {
        name: 'улица Антона Петрова, 6',
        description: 'Барнаул, Алтайский край, Россия',
        Point: {
          pos: '83.745146 53.347333',
        },
      },
    },
    {
      GeoObject: {
        name: 'улица Генерала Петрова, 6',
        description: 'Севастополь, Россия',
        Point: {
          pos: '33.51794 44.609449',
        },
      },
    },
    {
      GeoObject: {
        name: 'улица Михаила Петрова, 6',
        description: 'Звездара, округ Белград, Сербия',
        Point: {
          pos: '20.503444 44.76811',
        },
      },
    },
  ]

  const expectedResult = [
    {
      name: 'улица Антона Петрова, 6',
      description: 'Барнаул, Алтайский край, Россия',
      point: { lat: 53.347333, lon: 83.745146 },
    },
    {
      name: 'улица Генерала Петрова, 6',
      description: 'Севастополь, Россия',
      point: { lat: 44.609449, lon: 33.51794 },
    },
    {
      name: 'улица Михаила Петрова, 6',
      description: 'Звездара, округ Белград, Сербия',
      point: { lat: 44.76811, lon: 20.503444 },
    },
  ]

  expect(convertFeatureMember(validFeatureMember)).toEqual(expectedResult)
})
