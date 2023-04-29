import Typewriter, { TypewriterClass } from "typewriter-effect";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef, useCallback } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { AnimatePresence } from 'framer-motion';
import * as S from '@style2d/Copyright.styled';
import * as M from '@motion2d/Copyright.motion';

export const Copyright = () => {
  const [isSkeleton, setIsSkeleton] = useState(true)

  const i18n = useTranslation();
  const typewriterRef = useRef<any>(null);
  const encodeAdvisor = useRef<string>(new DOMParser().parseFromString(
    '&#x4d;&#x73;&#x2e;&#x20;&#x48;&#x6f;&#x61;&#x6e;&#x67;&#x20;&#x56;&#x61;&#x6e;&#x20;&#x44;&#x75;&#x6e;&#x67;', 'text/html').body.textContent);
  const encodeDev1 = useRef<string>(new DOMParser().parseFromString(
    '&#x4b;&#x69;&#x65;&#x6e;&#x20;&#x54;&#x72;&#x75;&#x6e;&#x67;', 'text/html').body.textContent);
  const encodeDev2 = useRef<string>(new DOMParser().parseFromString(
    '&#x54;&#x68;&#x61;&#x6e;&#x68;&#x20;&#x54;&#x75;&#x79;&#x65;&#x74;', 'text/html').body.textContent);

  const createTypeWriterEffect = useCallback((scope: TypewriterClass) => {
    scope
      .changeDelay(20)
      .typeString(`${i18n.t("logo.advisor")}: ${ encodeAdvisor.current }`)
      .pauseFor(3000).deleteAll()
      .changeDelay(20)
      .typeString(`${i18n.t("logo.developer")}: ${ encodeDev1.current }`)
      .pauseFor(1500).deleteAll()
      .changeDelay(20)
      .typeString(`${i18n.t("logo.developer")}: ${ encodeDev2.current }`)
      .pauseFor(1500).deleteAll()
      .typeString(`${i18n.t("caption.top")} ${i18n.t("caption.bottom")}`)
      .start()
  }, [])

  const handleInitTypeWriter = useCallback((typewriter: TypewriterClass) => {
    typewriterRef.current = typewriter;
    createTypeWriterEffect(typewriter);
  }, [])

  const handleResetTypeWriter = useCallback((typewriter: TypewriterClass) => {
    typewriter.deleteAll()
    typewriter.pause()
    createTypeWriterEffect(typewriter)
  }, [])

  useEffect(() => {
    if (typewriterRef.current) {
      handleResetTypeWriter(typewriterRef.current)
    }
  }, [i18n.i18n.language, typewriterRef])

  useEffect(() => {
    setTimeout(() => {
      setIsSkeleton(false)
    }, 2000);
  })

  return (
    <S.StyledContainer>
      <AnimatePresence>
      {isSkeleton ? 
        <SkeletonTheme baseColor="#f5e9ff" highlightColor="#FFFFFF">
          <M.MotionSkeletonWrapper>
            <Skeleton count={1} width={180}/>
            <S.StyledSkeletonInlineWrapper>
              <Skeleton count={1} inline width={180}/>
              <Skeleton count={1} inline width={100}/>
            </S.StyledSkeletonInlineWrapper>
            <Skeleton count={1} width={80}/>
          </M.MotionSkeletonWrapper>
        </SkeletonTheme> : 
        <M.MotionContentWrapper>
        <div> HCMUTE University </div>
        <Typewriter
          onInit={(typewriter) => handleInitTypeWriter(typewriter)}
          options={{ autoStart: true, loop: true, cursor: '.' }}/>
          <div> ——— </div>
        </M.MotionContentWrapper>
      }
      </AnimatePresence>
    </S.StyledContainer>
  )
}