import { WeatherSearch } from "@/components/WeatherSearch";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Open-Meteo · no API key</p>
        <h1>WeatherFlow</h1>
        <p className="lede">
          Search any city for current conditions and a seven-day outlook.
        </p>
      </section>
      <WeatherSearch />
      <footer>
        Weather data by{" "}
        <a href="https://open-meteo.com" rel="noreferrer" target="_blank">
          Open-Meteo
        </a>{" "}
        (CC-BY 4.0).
      </footer>
    </main>
  );
}
