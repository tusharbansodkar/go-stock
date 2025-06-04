import Container from "@/components/shared/Container";
import TickerTape from "@/components/shared/TickerTape";
import { STOCK_FEED_ITEMS } from "@/data";

const MARKET_FEED_DATA = STOCK_FEED_ITEMS;

const Stocks = () => {
  return (
    <div>
      <TickerTape MARKET_FEED_ITEMS={MARKET_FEED_DATA} />
      <Container MARKET_FEED_ITEMS={MARKET_FEED_DATA} />
    </div>
  );
};
export default Stocks;
