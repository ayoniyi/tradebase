"use client";
import React, { useState } from "react";
import style from "./Marketplace.module.scss";
import Header from "../components/header/Header";
import { fetchDocsQuery } from "../utils/functions/firebaseFunctions";
import { collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import TradeModal from "./TradeModal";
import { AnimatePresence } from "framer-motion";
import TradeCardSkeleton from "../components/Skeleton/TradeCardSkeleton";
import Card from "../components/TradeCard/Card";

const Marketplace = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<any>();
  const [tradeType, setTradeType] = useState("All");
  //fetch trades
  const tradesCollectionRef = collection(db, "trades");
  const tradesQuery = fetchDocsQuery(["tradesQuery"], tradesCollectionRef);
  console.log(tradesQuery?.data, "trades>>");
  const handleTrade = (trade: any) => {
    setCurrentTrade(trade);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showModal && (
          <TradeModal currentTrade={currentTrade} handleClose={handleClose} />
        )}
      </AnimatePresence>
      <Header currentPage="Marketplace" />
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.top}>
            <h2>Marketplace</h2>
            <div className={style.tabsContainer}>
              <div
                className={
                  tradeType === "All"
                    ? style.tab + " " + style.activeTab
                    : style.tab
                }
                onClick={() => setTradeType("All")}
              >
                <p>All Ads</p>
              </div>
              <div
                className={
                  tradeType === "Tokens"
                    ? style.tab + " " + style.activeTab
                    : style.tab
                }
                onClick={() => setTradeType("Tokens")}
              >
                <p>Token swap</p>
              </div>
              <div
                className={
                  tradeType === "Physical item"
                    ? style.tab + " " + style.activeTab
                    : style.tab
                }
                onClick={() => setTradeType("Physical item")}
              >
                <p>Physical item</p>
              </div>
              <div
                className={
                  tradeType === "Digital products"
                    ? style.tab + " " + style.activeTab
                    : style.tab
                }
                onClick={() => setTradeType("Digital products")}
              >
                <p>Digital product</p>
              </div>
            </div>
          </div>
          {/* <div className={style.tradeGrid}>
            <div className={style.singleTrade}>
              <TradeCard />
            </div>
          </div> */}
          {tradeType === "All" ? (
            <>
              {!tradesQuery?.data?.isLoading ? (
                <div className={style.tradeGrid}>
                  {tradesQuery?.data?.map((trade: any) =>
                    trade?.status === "available" &&
                    trade?.tradeType === "Public sale" ? (
                      <Card
                        key={trade?.userId}
                        trade={trade}
                        handleTrade={handleTrade}
                        cardAction="Buy"
                      />
                    ) : (
                      ""
                    )
                  )}
                </div>
              ) : (
                <div className={style.tradeGrid}>
                  <TradeCardSkeleton />
                </div>
              )}
            </>
          ) : tradeType === "Tokens" ? (
            <>
              {!tradesQuery?.data?.isLoading ? (
                <div className={style.tradeGrid}>
                  {tradesQuery?.data?.map((trade: any) =>
                    trade?.tradeOption === "Token swap" &&
                    trade?.status === "available" &&
                    trade?.tradeType === "Public sale" ? (
                      <Card
                        key={trade?.userId}
                        trade={trade}
                        handleTrade={handleTrade}
                        cardAction="Buy"
                      />
                    ) : (
                      ""
                    )
                  )}
                </div>
              ) : (
                <div className={style.tradeGrid}>
                  <TradeCardSkeleton />
                </div>
              )}
            </>
          ) : tradeType === "Digital products" ? (
            <>
              {!tradesQuery?.data?.isLoading ? (
                <div className={style.tradeGrid}>
                  {tradesQuery?.data?.map((trade: any) =>
                    trade?.tradeOption === "Digital product" &&
                    trade?.status === "available" &&
                    trade?.tradeType === "Public sale" ? (
                      <Card
                        key={trade?.userId}
                        trade={trade}
                        handleTrade={handleTrade}
                        cardAction="Buy"
                      />
                    ) : (
                      ""
                    )
                  )}
                </div>
              ) : (
                <div className={style.tradeGrid}>
                  <TradeCardSkeleton />
                </div>
              )}
            </>
          ) : tradeType === "Physical item" ? (
            <>
              {!tradesQuery?.data?.isLoading ? (
                <div className={style.tradeGrid}>
                  {tradesQuery?.data?.map((trade: any) =>
                    trade?.tradeOption === "Physical item" &&
                    trade?.status === "available" &&
                    trade?.tradeType === "Public sale" ? (
                      <Card
                        key={trade?.userId}
                        trade={trade}
                        handleTrade={handleTrade}
                        cardAction="Buy"
                      />
                    ) : (
                      ""
                    )
                  )}
                </div>
              ) : (
                <div className={style.tradeGrid}>
                  <TradeCardSkeleton />
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Marketplace;
