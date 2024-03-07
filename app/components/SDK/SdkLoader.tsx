'use client'

import {useEffect} from 'react';

declare global {
    interface Window {
        SE: {
            ready: (callback: () => void) => void;
            workspace: (containerId: string) => {
                destroy: () => void;
                events: {
                    subscribe: any,
                    unsubscribe: any
                };
            };
        }
        SE_BASE: string;
        SE_HTTPS: boolean;
    }
}

const SE_BASE = "containers.sphere-engine.com";
const SE_HTTPS = true

const setupSEVariables = () => {
    window.SE_BASE = SE_BASE
    window.SE_HTTPS = SE_HTTPS
}

const loadScript = async () => {
    return new Promise((resolve) => {
        // @ts-ignore
        const SE = window?.SE || (window.SE = [])
        let js, fjs = document.getElementsByTagName('script')[0]

        if (!document.getElementById('sphere-engine-compilers-jssdk')) {
            js = document.createElement('script')
            js.id = 'sphere-engine-compilers-jssdk'
            js.src = `https://${SE_BASE}/static/sdk/sdk.min.js`
            fjs.parentNode?.insertBefore(js, fjs) //either this or document.head.appendChild(js), anything that inserts the script into DOM
        }

        SE.ready = function (f) {
            if (document.readyState !== 'loading' && document.readyState !== 'interactive') {
                f()
            } else {
                window.addEventListener('load', f)
            }
        }

        resolve(true)
    })
}

const ScriptLoader = () => {
    useEffect(() => {
        setupSEVariables()
        loadScript().then(() => {
            console.log('Script loaded successfully')
        }).catch((error) => {
            console.error('Error loading script:', error)
        })

        return () => {
            if (document.getElementById('sphere-engine-compilers-jssdk')) {
                document.getElementById('sphere-engine-compilers-jssdk')?.remove()
            }
        }
    }, [])

    return null
}

export default ScriptLoader