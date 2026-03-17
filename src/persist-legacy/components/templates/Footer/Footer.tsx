import s from './Footer.module.scss';

export function Footer() {
    return (
        <header className={s.footer}>
            <div className={`${s.footerContainer} + header__container`}>
                header
            </div>
        </header>
    )
}

