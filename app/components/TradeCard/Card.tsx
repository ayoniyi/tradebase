import React from "react";
import style from "./Card.module.scss";
import Link from "next/link";

const Card = (props: any) => {
  return (
    <>
      <Link href={`/trade/${props?.trade?.userId || props?.trade?.id}`}>
        <div className={style.card}>
          <div className={style.content}>
            <div className={style.cardLeft}>
              {props.trade.tradeOption === "Token swap" ? (
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="42" height="42" rx="21" fill="#FCECFF" />
                  <path
                    d="M17.4905 25.5285C17.3302 25.0474 16.9527 24.6699 16.4716 24.5095C15.982 24.3463 15.982 23.6538 16.4716 23.4906C16.9527 23.3302 17.3302 22.9527 17.4905 22.4716C17.6537 21.982 18.3463 21.982 18.5095 22.4716C18.6698 22.9527 19.0473 23.3302 19.5284 23.4906C20.018 23.6538 20.018 24.3463 19.5284 24.5095C19.0473 24.6699 18.6698 25.0474 18.5095 25.5285C18.3463 26.0181 17.6537 26.0181 17.4905 25.5285Z"
                    fill="#AB30A3"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.431 19.1438C18.3941 18.8926 18.375 18.6359 18.375 18.375C18.375 15.4755 20.7255 13.125 23.625 13.125C26.5245 13.125 28.875 15.4755 28.875 18.375C28.875 21.2745 26.5245 23.625 23.625 23.625C23.3641 23.625 23.1074 23.6059 22.8562 23.569C22.8686 23.711 22.875 23.8548 22.875 24C22.875 26.6924 20.6924 28.875 18 28.875C15.3076 28.875 13.125 26.6924 13.125 24C13.125 21.3076 15.3076 19.125 18 19.125C18.1452 19.125 18.289 19.1314 18.431 19.1438ZM19.875 18.375C19.875 16.3039 21.5539 14.625 23.625 14.625C25.6961 14.625 27.375 16.3039 27.375 18.375C27.375 20.4461 25.6961 22.125 23.625 22.125C23.1995 22.125 22.7919 22.0544 22.4126 21.9249C21.9297 20.8999 21.1001 20.0703 20.0751 19.5874C19.9456 19.2081 19.875 18.8005 19.875 18.375ZM18 20.625C16.136 20.625 14.625 22.136 14.625 24C14.625 25.864 16.136 27.375 18 27.375C19.864 27.375 21.375 25.864 21.375 24C21.375 22.136 19.864 20.625 18 20.625Z"
                    fill="#AB30A3"
                  />
                </svg>
              ) : (
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="42" height="42" rx="21" fill="#FEF1ED" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.875 12.75C13.4608 12.75 13.125 13.0858 13.125 13.5C13.125 13.9142 13.4608 14.25 13.875 14.25C14.4213 14.25 14.8986 14.647 14.9969 15.2055L15.5113 18.1295L15.5117 18.1321L15.8413 19.9741C16.0474 21.1261 16.2121 22.0461 16.4202 22.7769C16.6348 23.5306 16.913 24.1507 17.3854 24.6747C17.7099 25.0347 18.0895 25.3428 18.5103 25.5887C19.1198 25.9449 19.7917 26.1018 20.5906 26.1769C21.3689 26.25 22.3335 26.25 23.5487 26.25H23.9181C24.4586 26.25 24.9042 26.25 25.2713 26.2233C25.6537 26.1955 26.0017 26.1362 26.3394 25.9922C26.8319 25.7823 27.2632 25.4522 27.5898 25.0311C27.8154 24.7404 27.9562 24.4198 28.0717 24.0617C28.1818 23.72 28.2823 23.2987 28.4031 22.7927L28.4183 22.7288C28.6018 21.9596 28.7518 21.3311 28.8244 20.8179C28.8991 20.2899 28.9073 19.7932 28.7372 19.3145C28.4982 18.6416 28.0278 18.075 27.4122 17.7059C26.9785 17.4459 26.4882 17.3441 25.9441 17.2965C25.413 17.25 24.7474 17.25 23.9261 17.25H16.8796L16.4742 14.9456C16.2517 13.6811 15.1608 12.75 13.875 12.75ZM23.891 18.75C24.7557 18.75 25.3553 18.7507 25.8133 18.7908C26.2659 18.8304 26.4922 18.9032 26.6408 18.9924C26.9652 19.1869 27.2041 19.4797 27.3237 19.8166C27.3759 19.9634 27.3997 20.1795 27.3392 20.6078C27.2776 21.0429 27.1449 21.6027 26.9506 22.4169C26.8216 22.9577 26.7342 23.3218 26.644 23.6014C26.5572 23.8709 26.4829 24.0109 26.4047 24.1117C26.2373 24.3274 26.013 24.5008 25.7512 24.6124C25.6251 24.6661 25.4595 24.7057 25.1624 24.7273C24.8562 24.7495 24.4653 24.75 23.891 24.75H23.5866C22.3251 24.75 21.4309 24.7492 20.731 24.6834C20.0436 24.6188 19.6138 24.4963 19.2671 24.2937C18.9783 24.1248 18.7194 23.9144 18.4995 23.6704C18.2384 23.3807 18.0437 23.0012 17.8628 22.3661C17.6778 21.7164 17.5256 20.8709 17.3108 19.6705L17.1461 18.75H23.891Z"
                    fill="#F36F4A"
                  />
                  <path
                    d="M19.875 27.5625C19.875 28.0803 19.4553 28.5 18.9375 28.5C18.4197 28.5 18 28.0803 18 27.5625C18 27.0447 18.4197 26.625 18.9375 26.625C19.4553 26.625 19.875 27.0447 19.875 27.5625Z"
                    fill="#F36F4A"
                  />
                  <path
                    d="M25.6875 28.5C26.2053 28.5 26.625 28.0803 26.625 27.5625C26.625 27.0447 26.2053 26.625 25.6875 26.625C25.1697 26.625 24.75 27.0447 24.75 27.5625C24.75 28.0803 25.1697 28.5 25.6875 28.5Z"
                    fill="#F36F4A"
                  />
                </svg>
              )}

              <div className={style.tokenInfo}>
                <p>{props?.trade?.tradeOption}</p>
                <h3>
                  {props?.trade?.tradeOption === "Token swap"
                    ? props?.trade?.amountOfToken +
                      " " +
                      props?.trade?.tokenToBeSold
                    : props?.trade?.productName}
                </h3>
              </div>
            </div>
            <div className={style.cardRight}>
              <h3>
                <span>Price:</span> {props?.trade?.price} ETH
              </h3>
              <p>11/25/24 12:20 PM</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;