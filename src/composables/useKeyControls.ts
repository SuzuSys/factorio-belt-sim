import { useControlStore } from "@/stores/controls";

interface KeyFlag {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
}

const controlStore = useControlStore();

export function useKeyControls() {
  const keyFlag: KeyFlag = {
    w: false,
    a: false,
    s: false,
    d: false,
  };
  let timerId: NodeJS.Timeout;
  let moving = false;
  function move() {
    if (keyFlag.w !== keyFlag.s) {
      if (keyFlag.w) controlStore.posYIncrement();
      else if (keyFlag.s) controlStore.posYDecrement();
    }
    if (keyFlag.a !== keyFlag.d) {
      if (keyFlag.a) controlStore.posXIncrement();
      else if (keyFlag.d) controlStore.posXDecrement();
    }
  }

  function keydown(key: KeyboardEvent) {
    if (key.repeat) return;
    if (key.key === "w") keyFlag.w = true;
    else if (key.key === "a") keyFlag.a = true;
    else if (key.key === "s") keyFlag.s = true;
    else if (key.key === "d") keyFlag.d = true;
    if (!moving) {
      moving = true;
      timerId = setInterval(move, 1000 / 60);
    }
  }

  function keyup(key: KeyboardEvent) {
    if (key.key === "w") keyFlag.w = false;
    else if (key.key === "a") keyFlag.a = false;
    else if (key.key === "s") keyFlag.s = false;
    else if (key.key === "d") keyFlag.d = false;
    for (const k of Object.keys(keyFlag)) {
      if (keyFlag[k as keyof KeyFlag]) return;
    }
    clearInterval(timerId);
    moving = false;
  }

  onMounted(() => {
    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);
  });
  onUnmounted(() => {
    window.removeEventListener("keydown", keydown);
    window.removeEventListener("keyup", keyup);
    clearInterval(timerId);
  });
}
