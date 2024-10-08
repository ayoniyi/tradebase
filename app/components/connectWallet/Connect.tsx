"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import style from "./Connect.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import { modalFunc, overlayFunc } from "@/app/utils/motion";

import Logo from "@/app/logo.svg";
import Metamask from "./metamask.svg";
import Wc from "./wc.svg";
import Coinbase from "./coinbase.svg";
import Success from "./success.svg";
import { shortenHex } from "@/app/utils/formatting";

import TextInput from "../TextInput/TextInput";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/utils/firebase";
import { useDocsQuery } from "@/app/utils/functions/firebaseFunctions";
import { useQuery } from "@tanstack/react-query";

const Connect = (props: any) => {
  const [showDisconnect, setShowDisconnect] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  //const account = useAccount();
  const { address, isConnected, connector: activeConnector } = useAccount();
  const { connectors, connect, status, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const supportedWallets = connectors.filter(
    (connector: any, index: any, arr: any) => {
      if (connector.name === "WalletConnect") {
        const walletConnectInstances = arr.filter(
          (w: any) => w.name === "WalletConnect"
        );
        return index === arr.indexOf(walletConnectInstances[1]);
      }
      return ["MetaMask", "Coinbase Wallet"].includes(connector.name);
    }
  );
  const sw = supportedWallets.slice(0, 3);

  const docCollectionRef = query(
    collection(db, "users"),
    where("address", "==", address || "")
  );

  //const docsQuery = useDocsQuery("userDocs", docCollectionRef);

  const docsQuery = useQuery({
    queryKey: ["users", isConnected, address],
    queryFn: () =>
      getDocs(docCollectionRef).then((res) => {
        return res;
      }),
  });

  if (docsQuery.data?.docs && docsQuery?.data?.docs?.length >= 1) {
    //
    const docList = docsQuery?.data?.docs.map((doc: any) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    //props?.closeConnect();
    if (props.action === "createTrade") {
      props.handleCreate();
    }
  } else {
    // register new user
    //collect email and create user and address
    //create user on firestore
    //   await setDoc(doc(db, "users", res.user.uid), {
    //     name:"",
    //     address: userAddress,
    //     email: userInput.email,
    //   });
  }

  // console.log("docsQuery", docsQuery);
  // console.log("docsList", docList);
  //}

  return (
    <>
      {/* chainId: {account.chainId} */}
      {/* <div>{error?.message}</div> */}
      <motion.div
        className={style.overlay}
        key="overlay"
        onClick={props.handleClose}
        variants={overlayFunc}
        initial="hidden"
        animate="visible"
        exit="exit"
      ></motion.div>

      <motion.div
        className={style.modal}
        key="modal"
        variants={modalFunc}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {!isConnected ? (
          <div className={style.modalContent}>
            <div className={style.modalTop}>
              <p>Connect a wallet</p>
              <svg
                onClick={props.handleClose}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2913 2.17725L13.8226 0.708496L7.99967 6.53141L2.17676 0.708496L0.708008 2.17725L6.53092 8.00016L0.708008 13.8231L2.17676 15.2918L7.99967 9.46891L13.8226 15.2918L15.2913 13.8231L9.46842 8.00016L15.2913 2.17725Z"
                  fill="#1F1F1F"
                />
              </svg>
            </div>
            <div className={style.modalBody}>
              <div className={style.connectors}>
                {sw.map((connector: any) => (
                  <div
                    className={`
                    ${style.connectBtn} 
                    ${!connector.ready || isLoading ? "disable2" : ""} 
                    `}
                    key={connector?.id}
                    onClick={() => connect({ connector })}
                  >
                    <div className={style.walletImg} suppressHydrationWarning>
                      <Image
                        suppressHydrationWarning
                        src={
                          connector?.name === "MetaMask"
                            ? Metamask
                            : connector?.name === "WalletConnect"
                              ? Wc
                              : Coinbase
                        }
                        alt="wallet"
                      />
                    </div>
                    <p>
                      {connector.name}
                      {isLoading &&
                        pendingConnector?.id === connector.id &&
                        " (connecting)"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={style.modalContent}>
            <div className={style.modalTop2}>
              <div
                onClick={disconnect}
                className={style.connectedBx}
                onMouseEnter={(e) => setShowDisconnect(true)}
                onMouseLeave={(e) => setShowDisconnect(false)}
              >
                {!showDisconnect ? (
                  <>
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5 16.6668H5.5C4.11929 16.6668 3 15.5475 3 14.1668V5.18746C3 4.16355 3.83005 3.3335 4.85397 3.3335H10.5115C10.9085 3.3335 11.2368 3.95043 11.5535 4.62516H5.5C5.03976 4.62516 4.66667 4.99826 4.66667 5.4585C4.66667 5.91873 5.03976 6.29183 5.5 6.29183H12.5742L12.5833 6.29646H15.5008C16.8815 6.29646 18 7.41575 18 8.79646V9.16683H16.3333C14.9526 9.16683 13.8333 10.2861 13.8333 11.6668C13.8333 13.0475 14.9526 14.1668 16.3333 14.1668H18C18 15.5475 16.8807 16.6668 15.5 16.6668Z"
                        fill="#1671D9"
                      />
                      <path
                        d="M18 12.5002V10.8335H16.3333C15.8731 10.8335 15.5 11.2066 15.5 11.6668C15.5 12.1271 15.8731 12.5002 16.3333 12.5002H18Z"
                        fill="#1671D9"
                      />
                    </svg>
                    <p>{shortenHex(address)}</p>
                  </>
                ) : (
                  <p>Disconnect</p>
                )}
              </div>
              <svg
                onClick={props.handleClose}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2913 2.17725L13.8226 0.708496L7.99967 6.53141L2.17676 0.708496L0.708008 2.17725L6.53092 8.00016L0.708008 13.8231L2.17676 15.2918L7.99967 9.46891L13.8226 15.2918L15.2913 13.8231L9.46842 8.00016L15.2913 2.17725Z"
                  fill="#1F1F1F"
                />
              </svg>
            </div>
            <div className={style.connBody}>
              {/* <p>Wallet succcessfully connected</p>
              <Image
                className={style.walletC}
                src={
                  activeConnector?.name === "MetaMask"
                    ? Metamask
                    : activeConnector?.name === "WalletConnect"
                      ? Wc
                      : Coinbase
                }
                alt="wallet"
              />
              <Image src={Success} alt="Success" />
              <Image src={Logo} alt="Tradebase" /> */}
              {!isRegistered ? (
                <div className={style.emailBody}>
                  {/* <h3>Email address</h3> */}
                  <TextInput
                    labelName="Email address"
                    inputName="email"
                    type="email"
                    placeHolder="Enter email here"
                    ariaLabel="email"
                    //inputHandler={inputHandler}
                  />
                  <p>Email is required to contact you in case of disputes.</p>
                  <button>Proceed</button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Connect;
