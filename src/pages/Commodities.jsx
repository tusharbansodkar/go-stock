import Container from "@/components/shared/Container";
import TickerTape from "@/components/shared/TickerTape";
import { COMMODITY_FEED_ITEMS } from "@/data";

const MARKET_FEED_DATA = COMMODITY_FEED_ITEMS;

const Commodities = () => {
  return (
    <div>
      <TickerTape MARKET_FEED_ITEMS={MARKET_FEED_DATA} />
      <Container MARKET_FEED_ITEMS={MARKET_FEED_DATA} />
    </div>
  );
};
export default Commodities;
