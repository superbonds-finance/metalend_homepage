import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import downArrow from "../../assets/landing-page/bxs_down-arrow.png";
import './index.css';

export const FAQ = ({ type }) => {
  if (type === "intro") {
    return (
      <div className="">
        <Collapsible
          tabIndex={0}
          transitionTime={200}
          trigger={
            <div className="title-div faq-title">
              What is SuperStable?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            SuperStable is an onchain fixed-deposit platform that is powered by
            bringing together users that want fixed, predictable yield, with
            those users that want uncapped topside. Users receive 2 key options:
            1. To deposit USDC, and get a fixed rate of return in USDC, or 2. To
            underwrite the fixed yield, and earn variable yield in the form of
            farmed rewards.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div faq-title">
              Why should I use SuperStable?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="mt-6">
            For many reasons. For one, you receive exposure to a portfolio of
            stablecoins, mitigating the danger posed by any one stablecoin. As a
            buyer of a fixed deposit, you also earn a fixed yield, thereby
            creating certainty of the value of your deposit over a certain
            period of time.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              What makes SuperStable an appropriate choice?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            The platform is audited, will likely undergo further audits, and is
            backed by a series of investors well known to the community.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              What can I do to earn from SuperStable?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            Both buyers of fixed deposits, and LPs of those fixed deposits,
            stand to earn a return, just of a different nature. The key is that
            SuperStable mines yield from exposure to stablecoins, not other
            cryptocurrencies, thereby creating a lot of predictability and a
            real use case for various risk management strategies.
          </p>
        </Collapsible>
      </div>
    );
  }
  if (type === "sb") {
    return (
      <div className="">
        <Collapsible
          tabIndex={0}
          transitionTime={200}
          trigger={
            <div className="title-div">
              What is $SB Token?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            SB is a gas on SuperStable. It is required for and burned in every
            transaction. No new SB can be minted.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              What is the Utility of $SB token?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="mt-6">
            SB utility is as a gas, but other staking options will become
            available. It will always be the fuel for the SuerStable platform.
          </p>
        </Collapsible>
      </div>
    );
  }
  if (type === "fd") {
    return (
      <div className="">
        <Collapsible
          tabIndex={0}
          transitionTime={200}
          trigger={
            <div className="title-div">
              When do I start earning after buying a fixed deposit?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            Right away. All of your yield is in real-time. This means you could
            redeem your fixed deposit before maturity as well.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              How does SuperStable guaranteed a fixed return?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="mt-6">
            Superstable uses a risk framework to send the USDC used for FD
            purchases to various destinations cross-chain to generate a return.
            That return profile is varied. That rate is blended to create a
            fixed-rated of return.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              How to ensure my funds are safe?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            SuperStable (formerly known as SuperBonds) is an audited platform
            with all suggested remedies. This goes for the smart contracts as
            well as server-side security.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              What if I forget to redeem my FD?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            It will always be there. If you buy a 30-day FD, in theory you can
            come back 1 year and the smart contract will still have it available
            for you.
          </p>
        </Collapsible>

        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              What is “2x Yield Boost?”
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            Every day, a random period from 00:00 to 23:59 UTC, a yield boost is
            activated. During this period, 25% of the previous day’s collected
            fees are redistributed to FD buyers by increasing the yield on their
            FDs.
          </p>
        </Collapsible>

        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              Will my yield change on maturity?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            Not if you buy an FD. You know at the outset what you are paying and
            what you will gain.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              Where are my USDC stored after buying a Fixed deposit?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            SuperStable uses a risk framework with various criteria that allows
            USDC to be turned into other stablecoins and be farmed/lent
            (on-chain) to generate a yield and brought back to SuperStable. You
            can think of it as a one-click process by which allocations are
            programmatically made to the most established DApps cross-chain.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              Is there any extra charges for early redemptions?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            Fees are always subject to change. More information can be found in
            the fees section.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              Can I buy multiple FDs from the platform?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">Yes, there is no limit.</p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              Are there pre-requirements for buying a fixed deposit?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            No, you just need to have the relevant capital.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              Will only USDC work on the platform?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            USDC is the functional stablecoin of SuperStable. However, you can
            swap from other stablecoins readily on the platform to avail the
            necessary USDC.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              Can I lose any principal?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            There exists the possibility of losing principal. When an FD
            purchaser provides USDC to the smart contract, the capital is then
            deployed to a number of DApps across various blockchains. This
            naturally introduces multiple elements of vulnerability. If any of
            those elements are compromised, exploited, or cease to function, the
            total retrievable value of stablecoin may not equal the amount of
            USDC originally provided by the FD purchaser. In such event(s), in
            good faith, all retrievable value will be redeemable until there is
            an insufficiency. Any insufficiency will be a loss beared by the FD
            purchaser.
          </p>
        </Collapsible>
      </div>
    );
  }
  if (type === "lp") {
    return (
      <div className="">
        <Collapsible
          tabIndex={0}
          transitionTime={200}
          trigger={
            <div className="title-div">
              How can I become a LP?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            Go to the Liquidity page, enter the amount of liquidity to provide.
            You may want to stake the generated LP token to further increase
            your yield.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              What are the benefits of becoming a LP?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="mt-6">
            As an LP, you get some very distinct benefits. For one, you get a
            large portion of the emission of SB from the protocol when you stake
            your LP token on the Liquidity page. LPs also get a share of the
            platform fees for each transaction (reflected in the LP price). And
            LPs, also get to enjoy the variable yield generated by the farmed
            stablecoin.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              What actually is an LP Pool?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            LP pools on SuperStable are slightly different than most places.
            When you provide liquidity to the LP Pool, you are effectively
            providing your capital to be used as interest for purchasers of FDs.
            You are compensated heavily for this, as when asn FD is purchased,
            the USDC used to purchase the FD are farmed to generate a yield for
            LPs.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              Is there any risk associated being a LP?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            There are always risks to every position. One such risk could be
            that the yield the LP Pool is underwriting turns out to be higher
            than the aggregate yield generated by the LP. For instance, this
            could happen if the broader crypto market enters a prolonged bear
            market and the fixed yield (the liability of the LP) is not adjusted
            lower (by governance).
          </p>
        </Collapsible>
      </div>
    );
  }
  if (type === "staking") {
    return (
      <div className="">
        <Collapsible
          tabIndex={0}
          transitionTime={200}
          trigger={
            <div className="title-div">
              What is $SB staking?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="my-6">
            You are able to stake your SB, for further SB. This comes from a
            part of the protocol emissions.
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <div className="title-div">
              Are my $SB tokens are safe?
              <div>
                <img src={downArrow} alt="arrow" />
              </div>
              <p className="custom-border"></p>
            </div>
          }
        >
          <p className="mt-6">
            SB is staked into the token contract. All SuperStable contracts have
            been audited.
          </p>
        </Collapsible>
      </div>
    );
  }
  return null;
};
