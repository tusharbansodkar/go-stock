import Container from "@/components/shared/Container";
import TickerTape from "@/components/shared/TickerTape";
import { STOCK_FEED_ITEMS } from "@/data";

const MARKET_FEED_DATA = STOCK_FEED_ITEMS;

const Stocks = () => {
  return (
    <div>
      <TickerTape marketData={MARKET_FEED_DATA} />
      <Container />
    </div>
  );
};
export default Stocks;
