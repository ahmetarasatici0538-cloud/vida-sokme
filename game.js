(() => {
  "use strict";

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const slotsEl = document.getElementById("slots");
  const levelLabel = document.getElementById("levelLabel");
  const hintCountEl = document.getElementById("hintCount");
  const toastEl = document.getElementById("toast");
  const hintButton = document.getElementById("hintButton");

  const resultModal = document.getElementById("resultModal");
  const resultTitle = document.getElementById("resultTitle");
  const resultText = document.getElementById("resultText");
  const resultIcon = document.getElementById("resultIcon");
  const resultStars = document.getElementById("resultStars");
  const nextLevelButton = document.getElementById("nextLevelButton");

  const premiumModal = document.getElementById("premiumModal");
  const premiumNote = document.getElementById("premiumNote");

  const BOARD = {
    width: 900,
    height: 1080
  };

  const SLOT_LIMIT = 7;

  const COLORS = {
    coral: "#ef6c5b",
    blue: "#4f89d8",
    mint: "#55bba2",
    yellow: "#e7b63f",
    purple: "#956fc4",
    orange: "#e5873e"
  };

  const LEVELS = [
    {
      name: "İlk Düğüm",

      plates: [
        {
          id: "a",
          z: 1,
          color: COLORS.coral,

          points: [
            [125, 245],
            [705, 180],
            [760, 330],
            [170, 400]
          ],

          screws: [
            { x: 190, y: 310, c: "coral" },
            { x: 425, y: 270, c: "blue" },
            { x: 685, y: 260, c: "coral" }
          ]
        },

        {
          id: "b",
          z: 2,
          color: COLORS.blue,

          points: [
            [300, 120],
            [490, 110],
            [610, 900],
            [430, 925]
          ],

          screws: [
            { x: 395, y: 190, c: "blue" },
            { x: 455, y: 520, c: "yellow" },
            { x: 500, y: 845, c: "blue" }
          ]
        },

        {
          id: "c",
          z: 3,
          color: COLORS.yellow,

          points: [
            [120, 635],
            [790, 570],
            [810, 750],
            [145, 810]
          ],

          screws: [
            { x: 205, y: 700, c: "yellow" },
            { x: 455, y: 655, c: "coral" },
            { x: 730, y: 675, c: "yellow" }
          ]
        }
      ]
    },

    {
      name: "Renk Köprüsü",

      plates: [
        {
          id: "a",
          z: 1,
          color: COLORS.mint,

          points: [
            [105, 180],
            [275, 115],
            [650, 910],
            [485, 965]
          ],

          screws: [
            { x: 180, y: 220, c: "mint" },
            { x: 360, y: 520, c: "purple" },
            { x: 560, y: 880, c: "mint" }
          ]
        },

        {
          id: "b",
          z: 2,
          color: COLORS.purple,

          points: [
            [620, 115],
            [795, 195],
            [425, 970],
            [250, 895]
          ],

          screws: [
            { x: 700, y: 225, c: "purple" },
            { x: 535, y: 535, c: "orange" },
            { x: 340, y: 865, c: "purple" }
          ]
        },

        {
          id: "c",
          z: 3,
          color: COLORS.orange,

          points: [
            [110, 435],
            [790, 395],
            [805, 575],
            [120, 615]
          ],

          screws: [
            { x: 185, y: 520, c: "orange" },
            { x: 445, y: 470, c: "mint" },
            { x: 725, y: 495, c: "orange" }
          ]
        }
      ]
    },

    {
      name: "Çapraz Kilit",

      plates: [
        {
          id: "a",
          z: 1,
          color: COLORS.yellow,

          points: [
            [90, 160],
            [220, 105],
            [790, 865],
            [650, 955]
          ],

          screws: [
            { x: 165, y: 185, c: "yellow" },
            { x: 420, y: 520, c: "coral" },
            { x: 685, y: 865, c: "yellow" }
          ]
        },

        {
          id: "b",
          z: 2,
          color: COLORS.coral,

          points: [
            [690, 105],
            [815, 190],
            [210, 945],
            [90, 850]
          ],

          screws: [
            { x: 730, y: 190, c: "coral" },
            { x: 500, y: 515, c: "blue" },
            { x: 175, y: 845, c: "coral" }
          ]
        },

        {
          id: "c",
          z: 3,
          color: COLORS.blue,

          points: [
            [155, 355],
            [750, 325],
            [785, 500],
            [135, 535]
          ],

          screws: [
            { x: 220, y: 445, c: "blue" },
            { x: 450, y: 405, c: "yellow" },
            { x: 700, y: 425, c: "blue" }
          ]
        },

        {
          id: "d",
          z: 4,
          color: COLORS.mint,

          points: [
            [160, 650],
            [760, 600],
            [790, 770],
            [135, 825]
          ],

          screws: [
            { x: 215, y: 735, c: "mint" },
            { x: 455, y: 680, c: "mint" },
            { x: 715, y: 690, c: "mint" }
          ]
        }
      ]
    },

    {
      name: "Dönen Kafes",

      plates: [
        {
          id: "a",
          z: 1,
          color: COLORS.orange,

          points: [
            [100, 205],
            [265, 120],
            [735, 885],
            [565, 970]
          ],

          screws: [
            { x: 170, y: 220, c: "orange" },
            { x: 430, y: 545, c: "purple" },
            { x: 610, y: 890, c: "orange" }
          ]
        },

        {
          id: "b",
          z: 2,
          color: COLORS.mint,

          points: [
            [610, 110],
            [800, 205],
            [300, 960],
            [110, 865]
          ],

          screws: [
            { x: 700, y: 205, c: "mint" },
            { x: 510, y: 545, c: "blue" },
            { x: 215, y: 855, c: "mint" }
          ]
        },

        {
          id: "c",
          z: 3,
          color: COLORS.purple,

          points: [
            [105, 385],
            [785, 335],
            [805, 510],
            [120, 565]
          ],

          screws: [
            { x: 195, y: 470, c: "purple" },
            { x: 445, y: 415, c: "orange" },
            { x: 720, y: 430, c: "purple" }
          ]
        },

        {
          id: "d",
          z: 4,
          color: COLORS.blue,

          points: [
            [150, 650],
            [765, 595],
            [790, 775],
            [125, 835]
          ],

          screws: [
            { x: 215, y: 750, c: "blue" },
            { x: 455, y: 675, c: "mint" },
            { x: 710, y: 690, c: "blue" }
          ]
        }
      ]
    },

    {
      name: "Usta Tahtası",

      plates: [
        {
          id: "a",
          z: 1,
          color: COLORS.blue,

          points: [
            [100, 145],
            [235, 95],
            [790, 880],
            [650, 970]
          ],

          screws: [
            { x: 165, y: 180, c: "blue" },
            { x: 420, y: 505, c: "yellow" },
            { x: 670, y: 875, c: "blue" }
          ]
        },

        {
          id: "b",
          z: 2,
          color: COLORS.yellow,

          points: [
            [665, 90],
            [815, 160],
            [235, 975],
            [85, 890]
          ],

          screws: [
            { x: 735, y: 180, c: "yellow" },
            { x: 525, y: 520, c: "coral" },
            { x: 165, y: 870, c: "yellow" }
          ]
        },

        {
          id: "c",
          z: 3,
          color: COLORS.coral,

          points: [
            [115, 300],
            [780, 255],
            [805, 435],
            [125, 485]
          ],

          screws: [
            { x: 190, y: 390, c: "coral" },
            { x: 455, y: 330, c: "blue" },
            { x: 725, y: 350, c: "coral" }
          ]
        },

        {
          id: "d",
          z: 4,
          color: COLORS.mint,

          points: [
            [120, 545],
            [785, 500],
            [800, 675],
            [130, 725]
          ],

          screws: [
            { x: 195, y: 635, c: "mint" },
            { x: 455, y: 570, c: "mint" },
            { x: 725, y: 590, c: "mint" }
          ]
        },

        {
          id: "e",
          z: 5,
          color: COLORS.purple,

          points: [
            [145, 760],
            [755, 705],
            [785, 870],
            [125, 930]
          ],

          screws: [
            { x: 205, y: 850, c: "purple" },
            { x: 455, y: 790, c: "purple" },
            { x: 710, y: 805, c: "purple" }
          ]
        }
      ]
    }
  ];

  let state;

  let lastTime = performance.now();
  let audioContext = null;
  let toastTimer = null;

  function cloneLevel(level) {
    return {
      ...level,

      plates: level.plates.map((plate) => ({
        ...plate,

        points: plate.points.map(([x, y]) => [x, y]),

        screws: plate.screws.map((screw) => ({
          ...screw,
          removed: false,
          pulse: 0
        })),

        falling: false,
        inactive: false,
        fallY: 0,
        rotation: 0,
        velocity: 0
      }))
    };
  }

  function initialLevelIndex() {
    const saved = Number(
      localStorage.getItem("vida_rotasi_level") || 0
    );

    if (!Number.isInteger(saved)) {
      return 0;
    }

    return Math.max(
      0,
      Math.min(saved, LEVELS.length - 1)
    );
  }

  function newState(levelIndex = initialLevelIndex()) {
    return {
      levelIndex,
      level: cloneLevel(LEVELS[levelIndex]),

      slots: [],
      hints: 3,
      moves: 0,

      startedAt: performance.now(),

      locked: false,
      ended: false,

      particles: []
    };
  }

  function startLevel(levelIndex = initialLevelIndex()) {
    state = newState(levelIndex);

    localStorage.setItem(
      "vida_rotasi_level",
      String(levelIndex)
    );

    if (resultModal.open) {
      resultModal.close();
    }

    updateHud();
    showToast(`${state.level.name} başladı`);
  }

  function updateHud() {
    levelLabel.textContent =
      String(state.levelIndex + 1);

    hintCountEl.textContent =
      String(state.hints);

    hintButton.disabled =
      state.hints <= 0 ||
      state.ended ||
      state.locked;

    renderSlots();
  }

  function renderSlots(clearingIndexes = []) {
    slotsEl.innerHTML = "";

    for (let i = 0; i < SLOT_LIMIT; i++) {
      const slot =
        document.createElement("span");

      slot.className = "slot";

      if (state.slots[i]) {
        slot.classList.add("filled");

        slot.style.setProperty(
          "--screw-color",
          COLORS[state.slots[i]] || "#888"
        );
      }

      if (clearingIndexes.includes(i)) {
        slot.classList.add("clearing");
      }

      slotsEl.appendChild(slot);
    }
  }

  function resizeCanvas() {
    const rect =
      canvas.getBoundingClientRect();

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    canvas.width = Math.max(
      1,
      Math.round(rect.width * dpr)
    );

    canvas.height = Math.max(
      1,
      Math.round(rect.height * dpr)
    );
  }

  function roundedPolygonPath(
    points,
    radius = 18
  ) {
    if (!points.length) {
      return;
    }

    const length = points.length;

    for (
      let index = 0;
      index < length;
      index++
    ) {
      const previous =
        points[
          (index - 1 + length) % length
        ];

      const current =
        points[index];

      const next =
        points[(index + 1) % length];

      const distance1 = Math.hypot(
        current[0] - previous[0],
        current[1] - previous[1]
      );

      const distance2 = Math.hypot(
        next[0] - current[0],
        next[1] - current[1]
      );

      const radius1 = Math.min(
        radius,
        distance1 / 3
      );

      const radius2 = Math.min(
        radius,
        distance2 / 3
      );

      const point1 = [
        current[0] +
          (previous[0] - current[0]) *
          (radius1 / distance1),

        current[1] +
          (previous[1] - current[1]) *
          (radius1 / distance1)
      ];

      const point2 = [
        current[0] +
          (next[0] - current[0]) *
          (radius2 / distance2),

        current[1] +
          (next[1] - current[1]) *
          (radius2 / distance2)
      ];

      if (index === 0) {
        ctx.moveTo(point1[0], point1[1]);
      } else {
        ctx.lineTo(point1[0], point1[1]);
      }

      ctx.quadraticCurveTo(
        current[0],
        current[1],
        point2[0],
        point2[1]
      );
    }

    ctx.closePath();
  }

  function shadeColor(hex, amount) {
    const value =
      parseInt(hex.slice(1), 16);

    const red = Math.max(
      0,
      Math.min(
        255,
        (value >> 16) + amount
      )
    );

    const green = Math.max(
      0,
      Math.min(
        255,
        ((value >> 8) & 255) + amount
      )
    );

    const blue = Math.max(
      0,
      Math.min(
        255,
        (value & 255) + amount
      )
    );

    return `rgb(${red}, ${green}, ${blue})`;
  }

  function drawWood() {
    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        BOARD.width,
        BOARD.height
      );

    gradient.addColorStop(
      0,
      "#d9a269"
    );

    gradient.addColorStop(
      0.48,
      "#b97947"
    );

    gradient.addColorStop(
      1,
      "#8d522f"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
      0,
      0,
      BOARD.width,
      BOARD.height
    );

    ctx.save();

    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = "#4e2816";
    ctx.lineWidth = 8;

    for (
      let y = 45;
      y < BOARD.height;
      y += 86
    ) {
      ctx.beginPath();

      for (
        let x = -30;
        x <= BOARD.width + 30;
        x += 30
      ) {
        const wobble =
          Math.sin((x + y) * 0.018) * 9 +
          Math.sin(x * 0.043) * 4;

        if (x === -30) {
          ctx.moveTo(x, y + wobble);
        } else {
          ctx.lineTo(x, y + wobble);
        }
      }

      ctx.stroke();
    }

    ctx.restore();

    const vignette =
      ctx.createRadialGradient(
        450,
        490,
        140,
        450,
        520,
        660
      );

    vignette.addColorStop(
      0,
      "rgba(255,255,255,.08)"
    );

    vignette.addColorStop(
      1,
      "rgba(42,18,6,.36)"
    );

    ctx.fillStyle = vignette;

    ctx.fillRect(
      0,
      0,
      BOARD.width,
      BOARD.height
    );
  }

  function drawPlate(plate) {
    if (plate.inactive) {
      return;
    }

    ctx.save();

    const centerX =
      plate.points.reduce(
        (total, point) =>
          total + point[0],
        0
      ) / plate.points.length;

    const centerY =
      plate.points.reduce(
        (total, point) =>
          total + point[1],
        0
      ) / plate.points.length;

    ctx.translate(
      centerX,
      centerY + plate.fallY
    );

    ctx.rotate(plate.rotation);

    ctx.translate(
      -centerX,
      -centerY
    );

    ctx.beginPath();

    roundedPolygonPath(
      plate.points,
      22
    );

    ctx.shadowColor =
      "rgba(47,22,9,.42)";

    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 14;

    ctx.fillStyle =
      shadeColor(plate.color, -34);

    ctx.fill();

    ctx.shadowColor = "transparent";

    ctx.translate(0, -8);
    ctx.beginPath();

    roundedPolygonPath(
      plate.points,
      22
    );

    const gradient =
      ctx.createLinearGradient(
        120,
        120,
        770,
        900
      );

    gradient.addColorStop(
      0,
      shadeColor(plate.color, 28)
    );

    gradient.addColorStop(
      0.5,
      plate.color
    );

    gradient.addColorStop(
      1,
      shadeColor(plate.color, -24)
    );

    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.save();
    ctx.clip();

    ctx.globalAlpha = 0.22;
    ctx.fillStyle = "white";

    ctx.fillRect(
      80,
      80,
      110,
      950
    );

    ctx.restore();

    ctx.lineWidth = 5;

    ctx.strokeStyle =
      "rgba(255,255,255,.55)";

    ctx.stroke();

    for (const screw of plate.screws) {
      if (!screw.removed) {
        drawScrew(screw, plate);
      }
    }

    ctx.restore();
  }

  function drawScrew(screw, plate) {
    const blocked =
      isScrewBlocked(plate, screw);

    const pulse =
      screw.pulse > 0
        ? Math.sin(
            performance.now() * 0.018
          ) * 6 + 8
        : 0;

    ctx.save();

    ctx.translate(
      screw.x,
      screw.y
    );

    ctx.shadowColor = blocked
      ? "rgba(24,14,9,.4)"
      : "rgba(255,222,98,.7)";

    ctx.shadowBlur = blocked
      ? 8
      : 10 + pulse;

    ctx.shadowOffsetY = 5;

    const metal =
      ctx.createRadialGradient(
        -11,
        -13,
        3,
        0,
        0,
        35
      );

    metal.addColorStop(
      0,
      "#ffffff"
    );

    metal.addColorStop(
      0.35,
      "#d8dde0"
    );

    metal.addColorStop(
      0.72,
      "#8d979c"
    );

    metal.addColorStop(
      1,
      "#4f585d"
    );

    ctx.fillStyle = metal;

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      31,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.shadowColor = "transparent";

    ctx.lineWidth = 4;
    ctx.strokeStyle =
      "rgba(28,35,39,.8)";

    ctx.beginPath();
    ctx.moveTo(-15, 0);
    ctx.lineTo(15, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(0, 15);
    ctx.stroke();

    ctx.fillStyle =
      COLORS[screw.c];

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      7,
      0,
      Math.PI * 2
    );

    ctx.fill();

    if (blocked) {
      ctx.fillStyle =
        "rgba(36,21,13,.38)";

      ctx.beginPath();

      ctx.arc(
        0,
        0,
        34,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    ctx.restore();
  }

  function drawParticles() {
    for (const particle of state.particles) {
      ctx.save();

      ctx.globalAlpha =
        Math.max(0, particle.life);

      ctx.fillStyle =
        particle.color;

      ctx.translate(
        particle.x,
        particle.y
      );

      ctx.rotate(
        particle.rotation
      );

      ctx.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size
      );

      ctx.restore();
    }
  }

  function update(deltaTime) {
    for (const plate of state.level.plates) {
      if (
        !plate.falling ||
        plate.inactive
      ) {
        continue;
      }

      plate.velocity +=
        1800 * deltaTime;

      plate.fallY +=
        plate.velocity * deltaTime;

      const direction =
        plate.id.charCodeAt(0) % 2
          ? 1
          : -1;

      plate.rotation +=
        direction *
        1.2 *
        deltaTime;

      if (plate.fallY > 1250) {
        plate.inactive = true;
      }
    }

    for (const plate of state.level.plates) {
      for (const screw of plate.screws) {
        screw.pulse = Math.max(
          0,
          screw.pulse - deltaTime
        );
      }
    }

    for (const particle of state.particles) {
      particle.life -=
        deltaTime * 1.6;

      particle.vy +=
        650 * deltaTime;

      particle.x +=
        particle.vx * deltaTime;

      particle.y +=
        particle.vy * deltaTime;

      particle.rotation +=
        particle.spin * deltaTime;
    }

    state.particles =
      state.particles.filter(
        (particle) =>
          particle.life > 0
      );
  }

  function frame(now) {
    const deltaTime = Math.min(
      0.033,
      (now - lastTime) / 1000
    );

    lastTime = now;

    update(deltaTime);

    ctx.setTransform(
      canvas.width / BOARD.width,
      0,
      0,
      canvas.height / BOARD.height,
      0,
      0
    );

    drawWood();

    const sortedPlates =
      [...state.level.plates].sort(
        (first, second) =>
          first.z - second.z
      );

    sortedPlates.forEach(drawPlate);

    drawParticles();

    requestAnimationFrame(frame);
  }

  function pointInPolygon(
    x,
    y,
    points
  ) {
    let inside = false;

    for (
      let index = 0,
          previousIndex =
            points.length - 1;

      index < points.length;

      previousIndex = index++
    ) {
      const currentX =
        points[index][0];

      const currentY =
        points[index][1];

      const previousX =
        points[previousIndex][0];

      const previousY =
        points[previousIndex][1];

      const intersect =
        (currentY > y) !==
          (previousY > y) &&
        x <
          (
            (previousX - currentX) *
            (y - currentY)
          ) /
            (
              previousY -
                currentY ||
              0.00001
            ) +
            currentX;

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }

  function isScrewBlocked(
    plate,
    screw
  ) {
    return state.level.plates.some(
      (otherPlate) => {
        if (
          otherPlate.id === plate.id ||
          otherPlate.inactive ||
          otherPlate.falling ||
          otherPlate.z <= plate.z
        ) {
          return false;
        }

        return pointInPolygon(
          screw.x,
          screw.y,
          otherPlate.points
        );
      }
    );
  }

  function findScrewAt(x, y) {
    const plates =
      [...state.level.plates].sort(
        (first, second) =>
          second.z - first.z
      );

    for (const plate of plates) {
      if (
        plate.inactive ||
        plate.falling
      ) {
        continue;
      }

      for (const screw of plate.screws) {
        const distance =
          Math.hypot(
            x - screw.x,
            y - screw.y
          );

        if (
          !screw.removed &&
          distance <= 48
        ) {
          return {
            plate,
            screw
          };
        }
      }
    }

    return null;
  }

  function eventToBoardPoint(event) {
    const rect =
      canvas.getBoundingClientRect();

    return {
      x:
        (
          event.clientX -
          rect.left
        ) /
        rect.width *
        BOARD.width,

      y:
        (
          event.clientY -
          rect.top
        ) /
        rect.height *
        BOARD.height
    };
  }

  function handlePointer(event) {
    event.preventDefault();

    if (
      state.locked ||
      state.ended
    ) {
      return;
    }

    const point =
      eventToBoardPoint(event);

    const hit =
      findScrewAt(
        point.x,
        point.y
      );

    if (!hit) {
      return;
    }

    if (
      isScrewBlocked(
        hit.plate,
        hit.screw
      )
    ) {
      hit.screw.pulse = 0.35;

      playTone(
        110,
        0.07,
        "square",
        0.035
      );

      showToast(
        "Bu vida başka bir parçanın altında"
      );

      return;
    }

    if (
      state.slots.length >=
      SLOT_LIMIT
    ) {
      return;
    }

    removeScrew(
      hit.plate,
      hit.screw
    );
  }

  function removeScrew(
    plate,
    screw
  ) {
    screw.removed = true;

    state.moves++;
    state.slots.push(screw.c);

    playTone(
      360 +
        state.slots.length * 30,
      0.07,
      "triangle",
      0.04
    );

    spawnParticles(
      screw.x,
      screw.y,
      COLORS[screw.c],
      9
    );

    if (
      plate.screws.every(
        (item) =>
          item.removed
      )
    ) {
      plate.falling = true;
      plate.velocity = -120;

      playTone(
        170,
        0.12,
        "sine",
        0.05
      );
    }

    updateHud();

    state.locked = true;

    setTimeout(
      resolveMatchesAndState,
      260
    );
  }

  function findTriple() {
    const counts = new Map();

    state.slots.forEach(
      (color, index) => {
        if (!counts.has(color)) {
          counts.set(color, []);
        }

        counts.get(color).push(index);
      }
    );

    for (
      const indexes
      of counts.values()
    ) {
      if (indexes.length >= 3) {
        return indexes.slice(0, 3);
      }
    }

    return null;
  }

  function resolveMatchesAndState() {
    const triple = findTriple();

    if (triple) {
      renderSlots(triple);

      playChord([
        520,
        660,
        780
      ]);

      setTimeout(() => {
        state.slots =
          state.slots.filter(
            (_, index) =>
              !triple.includes(index)
          );

        updateHud();

        state.locked = false;

        checkEndState();
      }, 300);

      return;
    }

    state.locked = false;

    checkEndState();
  }

  function checkEndState() {
    const allRemoved =
      state.level.plates.every(
        (plate) =>
          plate.screws.every(
            (screw) =>
              screw.removed
          )
      );

    if (allRemoved) {
      state.ended = true;

      const seconds =
        (
          performance.now() -
          state.startedAt
        ) / 1000;

      let starCount = 1;

      if (
        state.moves <=
          totalScrews() + 1 &&
        seconds < 80
      ) {
        starCount = 3;
      } else if (seconds < 150) {
        starCount = 2;
      }

      setTimeout(() => {
        showResult(
          true,
          starCount
        );
      }, 650);

      return;
    }

    if (
      state.slots.length >=
      SLOT_LIMIT
    ) {
      state.ended = true;

      setTimeout(() => {
        showResult(false, 0);
      }, 250);
    }
  }

  function totalScrews() {
    return state.level.plates.reduce(
      (total, plate) =>
        total +
        plate.screws.length,
      0
    );
  }

  function showResult(
    won,
    stars
  ) {
    resultIcon.textContent =
      won ? "★" : "×";

    resultTitle.textContent =
      won
        ? "Bölüm tamamlandı"
        : "Yuvalar doldu";

    resultText.textContent =
      won
        ? `${state.moves} hamlede bütün parçaları serbest bıraktın.`
        : "Aynı renkten üç vida eşleştirmeden yedi yuvayı doldurdun.";

    resultStars.textContent =
      won
        ? "★".repeat(stars) +
          "☆".repeat(3 - stars)
        : "☆☆☆";

    nextLevelButton.hidden = !won;

    nextLevelButton.textContent =
      state.levelIndex ===
      LEVELS.length - 1
        ? "Baştan oyna"
        : "Sonraki bölüm";

    resultModal.showModal();
  }

  function useHint() {
    if (
      state.hints <= 0 ||
      state.locked ||
      state.ended
    ) {
      return;
    }

    const counts =
      state.slots.reduce(
        (map, color) => {
          map.set(
            color,
            (map.get(color) || 0) + 1
          );

          return map;
        },
        new Map()
      );

    const available = [];

    for (
      const plate
      of state.level.plates
    ) {
      if (
        plate.inactive ||
        plate.falling
      ) {
        continue;
      }

      for (
        const screw
        of plate.screws
      ) {
        if (
          !screw.removed &&
          !isScrewBlocked(
            plate,
            screw
          )
        ) {
          available.push({
            plate,
            screw
          });
        }
      }
    }

    if (!available.length) {
      showToast(
        "Şu anda sökülebilen vida yok"
      );

      return;
    }

    available.sort(
      (first, second) => {
        const secondCount =
          counts.get(
            second.screw.c
          ) || 0;

        const firstCount =
          counts.get(
            first.screw.c
          ) || 0;

        return (
          secondCount -
          firstCount
        );
      }
    );

    available[0].screw.pulse =
      2.2;

    state.hints--;

    updateHud();

    showToast(
      "Parlayan vidaya dokun"
    );
  }

  function spawnParticles(
    x,
    y,
    color,
    count
  ) {
    for (
      let index = 0;
      index < count;
      index++
    ) {
      const angle =
        Math.random() *
        Math.PI *
        2;

      const speed =
        90 +
        Math.random() * 180;

      state.particles.push({
        x,
        y,
        color,

        life:
          0.7 +
          Math.random() * 0.45,

        vx:
          Math.cos(angle) *
          speed,

        vy:
          Math.sin(angle) *
            speed -
          110,

        size:
          7 +
          Math.random() * 9,

        rotation:
          Math.random() *
          Math.PI,

        spin:
          (
            Math.random() -
            0.5
          ) * 7
      });
    }
  }

  function showToast(text) {
    toastEl.textContent = text;

    toastEl.classList.add(
      "show"
    );

    clearTimeout(toastTimer);

    toastTimer = setTimeout(
      () => {
        toastEl.classList.remove(
          "show"
        );
      },
      1600
    );
  }

  function playTone(
    frequency,
    duration,
    type = "sine",
    volume = 0.03
  ) {
    try {
      if (!audioContext) {
        audioContext =
          new (
            window.AudioContext ||
            window.webkitAudioContext
          )();
      }

      const oscillator =
        audioContext.createOscillator();

      const gain =
        audioContext.createGain();

      oscillator.frequency.value =
        frequency;

      oscillator.type = type;

      gain.gain.setValueAtTime(
        volume,
        audioContext.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime +
          duration
      );

      oscillator
        .connect(gain)
        .connect(
          audioContext.destination
        );

      oscillator.start();

      oscillator.stop(
        audioContext.currentTime +
          duration
      );
    } catch (error) {
      console.warn(
        "Ses oynatılamadı:",
        error
      );
    }
  }

  function playChord(frequencies) {
    frequencies.forEach(
      (frequency, index) => {
        setTimeout(() => {
          playTone(
            frequency,
            0.1,
            "sine",
            0.035
          );
        }, index * 55);
      }
    );
  }

  canvas.addEventListener(
    "pointerdown",
    handlePointer
  );

  window.addEventListener(
    "resize",
    resizeCanvas
  );

  document
    .getElementById(
      "restartButton"
    )
    .addEventListener(
      "click",
      () => {
        startLevel(
          state.levelIndex
        );
      }
    );

  document
    .getElementById(
      "resultRestart"
    )
    .addEventListener(
      "click",
      () => {
        startLevel(
          state.levelIndex
        );
      }
    );

  hintButton.addEventListener(
    "click",
    useHint
  );

  document
    .getElementById(
      "helpButton"
    )
    .addEventListener(
      "click",
      () => {
        document
          .getElementById(
            "helpModal"
          )
          .showModal();
      }
    );

  nextLevelButton.addEventListener(
    "click",
    () => {
      const nextIndex =
        (
          state.levelIndex + 1
        ) %
        LEVELS.length;

      startLevel(nextIndex);
    }
  );

  document
    .querySelectorAll(
      "[data-close-dialog]"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const dialog =
            document.getElementById(
              button.dataset
                .closeDialog
            );

          if (dialog) {
            dialog.close();
          }
        }
      );
    });

  document
    .getElementById(
      "premiumButton"
    )
    .addEventListener(
      "click",
      () => {
        if (
          window.VidaAds.isPremium()
        ) {
          return;
        }

        const configured =
          Boolean(
            window.VIDA_CONFIG
              .paymentUrl
          );

        premiumNote.textContent =
          configured
            ? "Ödeme, güvenli sağlayıcının sayfasında tamamlanır. Kart bilgisi bu oyuna gelmez."
            : "Gerçek ödeme bağlantısı ayarlanmamış.";

        document
          .getElementById(
            "demoPremiumButton"
          )
          .hidden =
            !window.VIDA_CONFIG
              .allowDemoPremium;

        premiumModal.showModal();
      }
    );

  document
    .getElementById(
      "startPurchaseButton"
    )
    .addEventListener(
      "click",
      () => {
        const started =
          window.VidaAds
            .beginPurchase();

        if (!started) {
          premiumNote.textContent =
            "Önce config.js içindeki paymentUrl alanını doldurmalısın.";
        }
      }
    );

  document
    .getElementById(
      "demoPremiumButton"
    )
    .addEventListener(
      "click",
      () => {
        window.VidaAds
          .setPremium(true);

        premiumModal.close();

        showToast(
          "Test modu: reklamlar kapatıldı"
        );
      }
    );

  document
    .getElementById("year")
    .textContent =
      String(
        new Date().getFullYear()
      );

  async function boot() {
    await window.VidaAds
      .verifyPremiumFromUrl();

    window.VidaAds.loadAds();

    startLevel();
    resizeCanvas();

    requestAnimationFrame(frame);

    if (
      navigator.serviceWorker &&
      location.protocol.startsWith(
        "http"
      )
    ) {
      navigator.serviceWorker
        .register("sw.js")
        .catch((error) => {
          console.warn(
            "Service Worker kurulamadı:",
            error
          );
        });
    }
  }

  boot();
})();
