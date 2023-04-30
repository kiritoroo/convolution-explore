import * as S from '@style2d/Copyright.styled'
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { AnimatePresence } from 'framer-motion';

export const Copyright = () => {
  const [isLoading, setIsLoading] = useState(true)

  const i18n = useTranslation();
  const typewriterRef = useRef<any>(null);
  const _advisor = new DOMParser().parseFromString(
    '&#x4d;&#x73;&#x2e;&#x20;&#x48;&#x6f;&#x61;&#x6e;&#x67;&#x20;&#x56;&#x61;&#x6e;&#x20;&#x44;&#x75;&#x6e;&#x67;', 'text/html').body.textContent;
  const _dev1 = new DOMParser().parseFromString(
    '&#x4b;&#x69;&#x65;&#x6e;&#x20;&#x54;&#x72;&#x75;&#x6e;&#x67;', 'text/html').body.textContent;
  const _dev2 = new DOMParser().parseFromString(
    '&#x54;&#x68;&#x61;&#x6e;&#x68;&#x20;&#x54;&#x75;&#x79;&#x65;&#x74;', 'text/html').body.textContent;

  useEffect(() => {
    if (typewriterRef.current) {
      typewriterRef.current.deleteAll()
      typewriterRef.current.pause()

      typewriterRef.current
        .changeDelay(20)
        .typeString(`${i18n.t("logo.advisor")}: ${_advisor}`)
        .pauseFor(3000)
        .deleteAll()
        .changeDelay(20)
        .typeString(`${i18n.t("logo.developer")}: ${_dev1}`)
        .pauseFor(1500)
        .deleteAll()
        .changeDelay(20)
        .typeString(`${i18n.t("logo.developer")}:  ${_dev2}`)
        .pauseFor(1500)
        .deleteAll()
        .typeString(`${i18n.t("caption.top")} ${i18n.t("caption.bottom")}`)
        .start()
    }
  }, [i18n.i18n.language, typewriterRef])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  })

  return (
    <S.StyledContainer>
      <SkeletonTheme baseColor="#f5e9ff" highlightColor="#FFFFFF">
        <div>
          <AnimatePresence>
          {isLoading
          ? (
            <S.StyledSkeletonWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2}}>
              <Skeleton count={1} width={180}/>
              <S.StyledSkeletonInlineWrapper>
                <Skeleton count={1} inline width={180}/>
                <Skeleton count={1} inline width={100}/>
              </S.StyledSkeletonInlineWrapper>
              <div>
                <Skeleton count={1} width={80}/>
              </div> 
            </S.StyledSkeletonWrapper>
          ) 
          : (
            <S.StyledContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2}}>
            <div> HCMUTE University </div>
            <Typewriter
              onInit={(typewriter) => {
                typewriterRef.current = typewriter;
                typewriter
                  .changeDelay(20)
                  .typeString(`${i18n.t("logo.advisor")}: ${_advisor}`)
                  .pauseFor(3000)
                  .deleteAll()
                  .changeDelay(20)
                  .typeString(`${i18n.t("logo.developer")}: ${_dev1}`)
                  .pauseFor(1500)
                  .deleteAll()
                  .changeDelay(20)
                  .typeString(`${i18n.t("logo.developer")}: ${_dev2}`)
                  .pauseFor(1500)
                  .deleteAll()
                  .typeString(`${i18n.t("caption.top")} ${i18n.t("caption.bottom")}`)
                  .start()
              }}
              options={{
                autoStart: true,
                loop: true,
                cursor: '.'
              }}/>
              <div>
                ———
              </div>
            </S.StyledContentWrapper>
          )
            

          }
        </AnimatePresence>
        </div>
        </SkeletonTheme>
    </S.StyledContainer>
  )
}