import React, { useRef, useMemo, useEffect } from "react";
import * as S from '@style2d/Cursor.styled';
import { useRecoilValue } from "recoil";
import { cursorContentState, cursorVariantState } from "@store/atoms";
import useMouse from "@react-hook/mouse-position";
import { Transition, Variants, animate, useAnimate } from "framer-motion";

interface Props {

}

export const Cursor = ( props: Props ) => {
  const cursorContent = useRecoilValue(cursorContentState);
  const cursorVariant = useRecoilValue(cursorVariantState);

  const ref = React.useRef(document.getElementById('root'));

  const mouse = useMouse(ref, {
    enterDelay: 50,
    leaveDelay: 50
  });

  
  let mouseXPosition = 0;
  let mouseYPosition = 0;

  if (mouse.x !== null) {
    mouseXPosition = mouse.clientX ?? -10;
  }

  if (mouse.y !== null) {
    mouseYPosition = mouse.clientY ?? -10;
  }

  const transition = useRef<Transition>({
    transition: { type: "spring", stiffness: 2, damping: 2 }
  })

  const variants = useMemo<Variants>(() => ({
    default: { scale: 1, opacity: 1,
      x: mouseXPosition - 100/2,
      y: mouseYPosition - 30/2,
      transition: {
        type: "spring",
        mass: 0.2
      }
    },
    hoverlink: { scale: 1, opacity: 1,
      x: mouseXPosition - 100/2,
      y: mouseYPosition - 30/2,
      transition: {
        type: "spring",
        mass: 0.2
      }
    },
    hoverkernel: { scale: 1, opacity: 1,
      x: mouseXPosition - 100/2,
      y: mouseYPosition - 30/2,
      transition: {
        type: "spring",
        mass: 0.2
      }
    },
    hidden: {
      opacity: 0, scale: 0
    },
    exit: {
      opacity: 0, scale: 2
    }
  }), [mouseXPosition, mouseYPosition])

  const variants2 = useMemo<Variants>(() => ({
    default: { borderRadius: 50, border: "0px solid white" },
    hoverlink: { borderRadius: 0, border: "1px solid white", scale: 1.5,
      transition: {
        duration: 0.5, ease: "easeInOut",
      }
    },
    hoverkernel: { borderRadius: 0, border: "1px solid white", scale: 2,
      transition: {
        duration: 0.5, ease: "easeInOut",
      }
    }
  }), [mouseXPosition, mouseYPosition])

  const variants3 = useMemo<Variants>(() => ({
    default: { scale: 1 },
    hoverlink: { scale: 0.5 },
    hoverkernel: { scale: 0.3 },
  }), [mouseXPosition, mouseYPosition])

  const [scopeBorder, animate] = useAnimate()

  useEffect(() => {
    if (cursorVariant == "hoverlink") {
      animate(scopeBorder.current, { rotate: 360 + 45 }, { duration: 5, repeat: Infinity })
    } 
    else if (cursorVariant == "hoverkernel") {
      animate(scopeBorder.current, { rotate: 360 + 45 }, { duration: 3, repeat: Infinity })
    } 
    else {
      animate(scopeBorder.current, { rotate: 45 }, { duration: 0.2 })
    }
  }, [cursorVariant])

  return (
    <S.StyledContainer>
      <S.StyledCursorWrapper
        variants={ variants }
        style={{ originX: 0.5, originY: 0.5 }}
        transition={ transition.current }
        initial="hidden"
        animate={ cursorVariant }
        exit="exit"
      >
        <S.StyledCusrorBorder ref={scopeBorder}
          variants={ variants2 }
          animate={ cursorVariant }>
          <S.StyledCursorDot
            variants={ variants3 }
            animate={ cursorVariant }/>
        </S.StyledCusrorBorder>

        <S.StyledLabelWrapper>
          { cursorContent }
        </S.StyledLabelWrapper>
      </S.StyledCursorWrapper>
    </S.StyledContainer>
  )
}