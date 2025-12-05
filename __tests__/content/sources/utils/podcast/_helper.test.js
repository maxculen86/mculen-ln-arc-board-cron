import { transformPodcastData } from '../../../../../content/sources/utils/podcast/_helper';

describe('Podcast Source - helper - transformPodcastData', () => {
    const mockXml = `
    <rss>
      <channel>
        <item>
          <guid>123</guid>
          <title>Primer episodio</title>
          <description>Descripción 1</description>
          <itunes:duration>900</itunes:duration>
          <itunes:image href="https://img1.jpg" />
          <itunes:summary>Resumen 1</itunes:summary>
          <enclosure url="https://audio1.mp3" />
        </item>
        <item>
          <guid>456</guid>
          <title>Segundo episodio</title>
          <description>Descripción 2</description>
          <itunes:duration>1000</itunes:duration>
          <itunes:image href="https://img2.jpg" />
          <itunes:summary>Resumen 2</itunes:summary>
          <enclosure url="https://audio2.mp3" />
        </item>
      </channel>
    </rss>
    `;

    it('should transform XML podcast feed into an array of items', () => {
        const result = transformPodcastData(mockXml);

        expect(result).toHaveLength(2);

        expect(result[0]).toEqual({
            id: '123',
            title: 'Primer episodio',
            description: 'Descripción 1',
            duration: '900',
            image: 'https://img1.jpg',
            summary: 'Resumen 1',
            mp3: 'https://audio1.mp3'
        });

        expect(result[1]).toEqual({
            id: '456',
            title: 'Segundo episodio',
            description: 'Descripción 2',
            duration: '1000',
            image: 'https://img2.jpg',
            summary: 'Resumen 2',
            mp3: 'https://audio2.mp3'
        });
    });

    it('should return null for missing optional fields', () => {
        const xml = `
        <rss>
          <channel>
            <item>
              <guid>789</guid>
              <title>Sin imagen ni summary</title>
              <description>Desc</description>
              <itunes:duration>500</itunes:duration>
              <enclosure url="https://audio3.mp3" />
            </item>
          </channel>
        </rss>
        `;

        const result = transformPodcastData(xml);

        expect(result[0]).toEqual({
            id: '789',
            title: 'Sin imagen ni summary',
            description: 'Desc',
            duration: '500',
            image: null,
            summary: null,
            mp3: 'https://audio3.mp3'
        });
    });

    it('should return empty array when no <item> exists', () => {
        const emptyXml = `<rss><channel></channel></rss>`;
        const result = transformPodcastData(emptyXml);
        expect(result).toEqual([]);
    });
});
