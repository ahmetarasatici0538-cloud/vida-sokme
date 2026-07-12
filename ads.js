(() => {
  "use strict";

  const CONFIG =
    window.VIDA_CONFIG || {};

  const PREMIUM_KEY =
    "vida_rotasi_premium_v1";

  function isConfiguredId(value) {
    return (
      typeof value === "string" &&
      !value.includes("XXXX") &&
      /^ca-pub-\d+$/.test(value)
    );
  }

  function isPremium() {
    return (
      localStorage.getItem(
        PREMIUM_KEY
      ) === "true"
    );
  }

  function setPremium(value) {
    const premium =
      Boolean(value);

    localStorage.setItem(
      PREMIUM_KEY,
      String(premium)
    );

    updateAdVisibility();

    window.dispatchEvent(
      new CustomEvent(
        "premiumchange",
        {
          detail: {
            premium
          }
        }
      )
    );
  }

  function updateAdVisibility() {
    const premium =
      isPremium();

    document
      .querySelectorAll(
        "[data-ad-container]"
      )
      .forEach((element) => {
        element.hidden = premium;
      });

    const button =
      document.getElementById(
        "premiumButton"
      );

    if (!button) {
      return;
    }

    button.classList.toggle(
      "is-premium",
      premium
    );

    button.disabled = premium;

    if (premium) {
      button.textContent =
        "✓ Reklamlar kapalı";
    } else {
      button.innerHTML =
        `<span>◆</span> Reklamları kaldır <strong>${
          CONFIG.priceLabel ||
          "10 TL"
        }</strong>`;
    }
  }

  function configureAdElement(
    element,
    slot
  ) {
    element.dataset.adClient =
      CONFIG.adsenseClient;

    element.dataset.adSlot =
      slot;

    const placeholder =
      element.previousElementSibling;

    if (
      placeholder &&
      placeholder.classList.contains(
        "ad-placeholder"
      )
    ) {
      placeholder.remove();
    }
  }

  function loadAds() {
    updateAdVisibility();

    if (isPremium()) {
      return;
    }

    if (
      !isConfiguredId(
        CONFIG.adsenseClient
      )
    ) {
      console.info(
        "AdSense kimliği ayarlı değil. Reklam yer tutucuları gösteriliyor."
      );

      return;
    }

    const adElements = [
      ...document.querySelectorAll(
        "ins.adsbygoogle"
      )
    ];

    if (
      adElements.length >= 1 &&
      /^\d+$/.test(
        CONFIG.adsenseTopSlot || ""
      )
    ) {
      configureAdElement(
        adElements[0],
        CONFIG.adsenseTopSlot
      );
    }

    if (
      adElements.length >= 2 &&
      /^\d+$/.test(
        CONFIG.adsenseBottomSlot ||
          ""
      )
    ) {
      configureAdElement(
        adElements[1],
        CONFIG.adsenseBottomSlot
      );
    }

    const script =
      document.createElement(
        "script"
      );

    script.async = true;
    script.crossOrigin =
      "anonymous";

    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
      encodeURIComponent(
        CONFIG.adsenseClient
      );

    script.onload = () => {
      document
        .querySelectorAll(
          "ins.adsbygoogle[data-ad-slot]"
        )
        .forEach(() => {
          try {
            window.adsbygoogle =
              window.adsbygoogle ||
              [];

            window.adsbygoogle.push(
              {}
            );
          } catch (error) {
            console.warn(
              "Reklam başlatılamadı:",
              error
            );
          }
        });
    };

    document.head.appendChild(
      script
    );
  }

  async function verifyPremiumFromUrl() {
    const parameters =
      new URLSearchParams(
        location.search
      );

    const token =
      parameters.get(
        "premium_token"
      );

    if (
      !token ||
      !CONFIG.premiumVerifyEndpoint
    ) {
      return;
    }

    try {
      const response =
        await fetch(
          CONFIG.premiumVerifyEndpoint,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              token
            })
          }
        );

      const data =
        await response.json();

      if (
        response.ok &&
        data.premium === true
      ) {
        setPremium(true);

        parameters.delete(
          "premium_token"
        );

        const query =
          parameters.toString();

        history.replaceState(
          {},
          "",
          location.pathname +
            (
              query
                ? `?${query}`
                : ""
            )
        );
      }
    } catch (error) {
      console.warn(
        "Premium doğrulanamadı:",
        error
      );
    }
  }

  function beginPurchase() {
    if (!CONFIG.paymentUrl) {
      return false;
    }

    const returnUrl =
      location.origin +
      location.pathname;

    const url =
      new URL(
        CONFIG.paymentUrl,
        location.href
      );

    url.searchParams.set(
      "return_url",
      returnUrl
    );

    location.href =
      url.toString();

    return true;
  }

  window.VidaAds = {
    loadAds,
    isPremium,
    setPremium,
    beginPurchase,
    verifyPremiumFromUrl
  };
})();
