//Reformat the stock to match the server-side values
import type { StockWithNews, StockStatus } from "@/components/types/index.ts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  X,
  Heart,
  TrendingUp,
  TrendingDown,
  Globe,
  Users,
  DollarSign,
  Building,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import QuirksSection from "./quirks-section";

interface StockDetailProps {
  stock: StockWithNews;
  onLike: () => void;
  onPass: () => void;
  status: StockStatus;
}

const getQuirksForStock = (stock: StockWithNews) => {
  switch (stock.symbol) {
    case "AAPL":
      return [
        {
          title: "I Can Be High Maintenance",
          description: "My products aren't cheap, but I believe I'm worth it!",
          backgroundColor: "rgb(255, 245, 238)",
        },
        {
          title: "I'm Kind of a Control Freak",
          description: "I like my ecosystem closed and my standards high",
          backgroundColor: "rgb(247, 237, 255)",
        },
        {
          title: "Drama Follows Me",
          description:
            "You'll see regular headlines and mood swings in my stock price",
          backgroundColor: "rgb(237, 245, 255)",
        },
      ];
    default:
      return [];
  }
};

export default function StockDetail({
  stock,
  onLike,
  onPass,
  status,
}: StockDetailProps) {
  const variants = {
    liked: { x: "100%", opacity: 0, transition: { duration: 0.5 } },
    passed: { y: "100%", opacity: 0, transition: { duration: 0.5 } },
    neutral: { x: 0, y: 0, opacity: 1 },
  };

  const quirks = getQuirksForStock(stock);

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    return num.toString();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="flex h-full flex-col relative"
        variants={variants}
        animate={status}
        initial="neutral"
        exit={status === "liked" ? "liked" : "passed"}
      >
        {status === "liked" && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-50 z-10 rounded-3xl" />
        )}
        {status === "passed" && (
          <div className="absolute inset-0 bg-red-500 bg-opacity-50 z-10 rounded-3xl" />
        )}
        <div className="border-b p-8 z-20">
          <div className="mb-6 flex items-start justify-between">
            <div className="flex-1">
              <h1 className="font-['PP_Pangaia'] text-5xl mb-2">
                {stock.name}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-['PP_Radio_Grotesk']">
                  ${stock.price} {stock.currency}
                </span>
                {stock.trend === "up" && (
                  <span className="text-2xl text-green-500">↗</span>
                )}
                {stock.trend === "down" && (
                  <span className="text-2xl text-red-500">↘</span>
                )}
              </div>
              <div className="mt-2 text-lg text-gray-500 font-['PP_Radio_Grotesk']">
                {stock.symbol} • {stock.category}
              </div>
            </div>
            <img
              src={stock.logo || "/placeholder.svg"}
              alt={stock.name}
              className="h-24 w-24 rounded-full bg-black"
            />
          </div>
          <div className="flex gap-4">
            <Button
              size="lg"
              variant="outline"
              className="flex-1 font-['PP_Radio_Grotesk']"
              onClick={onPass}
            >
              <X className="mr-2 h-5 w-5" />
              Pass
            </Button>
            <Button
              size="lg"
              className="flex-1 font-['PP_Radio_Grotesk']"
              onClick={onLike}
            >
              <Heart className="mr-2 h-5 w-5" />
              Like
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 z-20">
          <div className="space-y-8 p-8">
            {quirks.length > 0 && (
              <section>
                <QuirksSection quirks={quirks} />
              </section>
            )}

            <section>
              <h2 className="font-['PP_Pangaia'] text-2xl mb-4">Bio</h2>
              <p className="text-gray-700 mb-4 font-['PP_Radio_Grotesk']">
                {stock.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center font-['PP_Radio_Grotesk']">
                  <Building className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Founded in {stock.foundedYear}</span>
                </div>
                <div className="flex items-center font-['PP_Radio_Grotesk']">
                  <Globe className="h-5 w-5 mr-2 text-gray-500" />
                  <a
                    href={stock.website}
                    className="text-blue-600 hover:underline"
                  >
                    {stock.website}
                  </a>
                </div>
                <div className="flex items-center font-['PP_Radio_Grotesk']">
                  <Users className="h-5 w-5 mr-2 text-gray-500" />
                  <span>
                    {stock.employees ? stock.employees.toLocaleString() : "N/A"}{" "}
                    Employees
                  </span>
                </div>
                <div className="flex items-center font-['PP_Radio_Grotesk']">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                  <span>
                    Market Cap: $
                    {stock.marketCap !== undefined
                      ? formatLargeNumber(stock.marketCap)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-['PP_Pangaia'] text-2xl mb-4">
                My Recent Mood Swings
              </h2>
              <img
                src={stock.chartImageUrl || "/placeholder.svg"}
                alt={`${stock.name} Stock Chart`}
                className="w-full h-[150px] object-cover rounded-lg shadow-md mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                {stock.quarterlyPerformance &&
                  stock.quarterlyPerformance.map((quarter) => (
                    <div
                      key={`${quarter.year}-${quarter.quarter}`}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="font-['PP_Radio_Grotesk']">
                        {quarter.quarter} {quarter.year}
                      </div>
                      <div
                        className={`flex items-center ${
                          quarter.change >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        } font-['PP_Radio_Grotesk']`}
                      >
                        {quarter.change >= 0 ? (
                          <TrendingUp className="mr-1 h-4 w-4" />
                        ) : (
                          <TrendingDown className="mr-1 h-4 w-4" />
                        )}
                        {quarter.change}%
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            <section>
              <h2 className="font-['PP_Pangaia'] text-2xl mb-4">
                More About Me
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">CEO</h3>
                  <p className="font-['PP_Radio_Grotesk']">{stock.ceo}</p>
                </div>
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    Headquarters
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">
                    {stock.headquarters}
                  </p>
                </div>
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    Industry
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">{stock.industry}</p>
                </div>
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    Exchanges
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">
                    {stock.exchanges ? stock.exchanges.join(", ") : "N/A"}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-['PP_Pangaia'] text-2xl mb-4">
                Financial Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    Report Date
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">
                    {stock.financials ? stock.financials.reportDate : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    Revenue
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">
                    $
                    {stock.financials
                      ? formatLargeNumber(stock.financials.revenue ?? 0)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    Net Income
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">
                    $
                    {stock.financials
                      ? formatLargeNumber(stock.financials.netIncome ?? 0)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    Operating Income
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">
                    $
                    {stock.financials
                      ? formatLargeNumber(stock.financials.operatingIncome ?? 0)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    EBITDA
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">
                    $
                    {stock.financials
                      ? formatLargeNumber(stock.financials.ebitda ?? 0)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    Total Assets
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">
                    $
                    {stock.financials
                      ? formatLargeNumber(stock.financials.totalAssets ?? 0)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    Total Liabilities
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">
                    $
                    {stock.financials
                      ? formatLargeNumber(
                          stock.financials.totalLiabilities ?? 0
                        )
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-['PP_Radio_Grotesk'] font-medium">
                    Equity
                  </h3>
                  <p className="font-['PP_Radio_Grotesk']">
                    $
                    {stock.financials
                      ? formatLargeNumber(stock.financials.equity ?? 0)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-['PP_Pangaia'] text-2xl mb-4">
                What My Friends Are Saying
              </h2>
              <div className="space-y-6">
                {stock.news.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <a href={article.link} className="block">
                        <h3 className="p-6 font-['PP_Pangaia'] text-xl">
                          {article.title}
                        </h3>
                        <img
                          src={article.imageUrl || "/placeholder.svg"}
                          alt=""
                          className="h-[150px] w-full object-cover"
                        />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </motion.div>
    </AnimatePresence>
  );
}
