/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';
import IconExternalLink from '@theme/IconExternalLink';
import Logo from '../../../static/img/tezos-logo-large.svg';
import TwitterLogo from '../../../static/img/twitter-footer.svg';
import TelegramLogo from '../../../static/img/telegram-footer.svg';
import RedditLogo from '../../../static/img/reddit-footer.svg';
import TezosLogo from '../../../static/img/tezos-footer.svg';
import StackexchangeLogo from '../../../static/img/stackexchange-footer.svg';
import RiotLogo from '../../../static/img/riot-footer.svg';
import GitlabLogo from '../../../static/img/gitlab-footer.svg';
import DiscordLogo from '../../../static/img/discord-footer.svg';
import GithubLogo from '../../../static/img/github-footer.svg';








function FooterLink({to, href, label, prependBaseUrlToHref, ...props}) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {href && !isInternalUrl(href) ? (
        <span>
          {label}
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

const FooterLogo = ({sources, alt}) => (
  <ThemedImage className="footer__logo" alt={alt} sources={sources} />
);

function Footer() {
  const {footer} = useThemeConfig();
  const {copyright, links = [], logo = {}} = footer || {};
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  const socialMedia = [
    {
      logo: <TwitterLogo />,
      url: 'https://twitter.com/tezos'
    },
    {
      logo:  <TelegramLogo />,
      url: 'https://t.me/tezosplatform'
    },{
      logo: <RedditLogo />,
      url: 'https://www.reddit.com/r/tezos'
    },{
      logo: <TezosLogo />,
      url: 'https://forum.tezosagora.org/'
    },{
      logo: <StackexchangeLogo />,
      url: 'https://tezos.stackexchange.com/'
    },{
      logo: <RiotLogo />,
      url: 'https://riot.tzchat.org/'
    },{
      logo: <GitlabLogo />,
      url: 'https://gitlab.com/tezos/tezos'
    },{
      logo: <DiscordLogo />,
      url: 'https://discord.com/invite/udZwhQn'
    },{
      logo:  <GithubLogo />,
      url: 'https://github.com/tezos/tezos'
    },
  ]
  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': footer.style === 'dark',
      })}>
      <div className="container container-footer">
        {links && links.length > 0 && (
          <div className="row footer__links">
             <div className="custom-footer-column">
            <div className="footer__title">
              <Logo />
              
            </div>
            <div className="footer__title custom-footer-title">
              FOLLOW US
            </div>
            <div className="social-media-row">
             {socialMedia.map(social => (
               <a href={social.url}>{social.logo}</a>
             ))}
            </div>
            <p className="footer-small-text"><small>Feedback or comments? Get in touch with us at <a className="mail-link-footer" href="mailto:reachout@tezos.com"><strong>reachout@tezos.com</strong></a></small></p>
          </div>
            {links.map((linkItem, i) => (
              <div key={i} className="col footer__col">
                {linkItem.title != null ? (
                  <div className="footer__title">{linkItem.title}</div>
                ) : null}
                {linkItem.items != null &&
                Array.isArray(linkItem.items) &&
                linkItem.items.length > 0 ? (
                  <ul className="footer__items">
                    {linkItem.items.map((item, key) =>
                      item.html ? (
                        <li
                          key={key}
                          className="footer__item" // Developer provided the HTML, so assume it's safe.
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: item.html,
                          }}
                        />
                      ) : (
                        <li key={item.href || item.to} className="footer__item">
                          <FooterLink {...item} />
                        </li>
                      ),
                    )}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        )}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && (logo.src || logo.srcDark) && (
              <div className="margin-bottom--sm">
                {logo.href ? (
                  <Link href={logo.href} className={styles.footerLogoLink}>
                    <FooterLogo alt={logo.alt} sources={sources} />
                  </Link>
                ) : (
                  <FooterLogo alt={logo.alt} sources={sources} />
                )}
              </div>
            )}
            {/* {copyright ? (
              <div
                className="footer__copyright" // Developer provided the HTML, so assume it's safe.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: copyright,
                }}
              />
            ) : null} */}
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
