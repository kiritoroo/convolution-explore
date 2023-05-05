import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, Variants, useAnimate } from "framer-motion";
import * as S from '@style2d/LanguageSwitcher.styled'
import * as M from '@motion2d/LanguageSwitcher.motion';

const variants: Variants = {
  hidden: { opacity: 0, scale: 0, height: 0 },
  enter: { opacity: 1, scale: 1, height: 'auto' },
  exit: { opacity: 0, scale: 0, height: 0 },
};

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const supportLngs: string[] = i18n.options.supportedLngs as string[]
  const currLng = i18n.language
  const [isOpen, setIsOpen] = useState(false)
  
  const timeOutIds: Array<any> = []

  useEffect(() => {
    timeOutIds.push(setTimeout(() => {
      if (isOpen) {
        setIsOpen(false)
      }
    }, 1000))
  }, [isOpen])

  const handleMouseEnter = () => {
    timeOutIds.forEach((id) => clearTimeout(id))
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeOutIds.push(setTimeout(() => {
      if (isOpen) {
        setIsOpen(false)
      }
    }, 500))
  }

  const handleChangeLocale = (locale: string) => {
    i18n.changeLanguage(locale)
  }

  const createMenuListItem = useCallback((langList: string[]) => {
    return (
      <S.StyledMenuList>
        {langList.slice(0, supportLngs.length - 1).map((locale, index) => (
          <S.StyledItem 
            key={`locale-${locale}`}
            onClick={() => handleChangeLocale(locale)}>
            {i18n.t(`locale.${locale}.lang`)}
          </S.StyledItem>
        ))}
      </S.StyledMenuList>
    )
  }, [])

  const renderedMenuListItem = useMemo<JSX.Element>(() => {
    return createMenuListItem(supportLngs ?? [])
  }, [supportLngs, currLng])

  return (
    <S.StyledContainer>
      <S.StyledButton onClick={() => setIsOpen(!isOpen)}>
        <M.MotionShortLocale 
          isOpen={ isOpen }>
          { i18n.t(`locale.${currLng}.short`) }
        </M.MotionShortLocale>
      </S.StyledButton>
      <M.MotionMenuWrapper
        isOpen={ isOpen }
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }>
        { renderedMenuListItem }
      </M.MotionMenuWrapper>
    </S.StyledContainer>
  );
}
