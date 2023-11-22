/*global chrome*/
import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'

export default function Home(props) {
    const flag = 0
    const [granted, setGranted] = useState(false)
    const permsButtonRef = useRef(null);

    useEffect(() => {
        console.log("use effect")
        if (chrome.permissions) {
            console.log("chrome perms")
            chrome.permissions.request({ permissions: ['<all_urls>'] }, (granted) => {
                setGranted(granted)
            });
        }
    }, [])

    useEffect(() => {
        if (permsButtonRef.current) {
            permsButtonRef.current.addEventListener('click', (e) => {
                chrome.permissions.request({ permissions: ['<all_urls>'] }, (isGranted) => {
                    setGranted(isGranted)
                });
            });
        }
    }, [permsButtonRef])

    function handleClick() {
        console.log("Clicked")
        if (granted) {
            console.log(window.location.href)
        }
    }
    return (
        <>
            <Header />
            <div className="backdrop-blur-xl bg-gradient-to-t from-[#070E25] to-black h-screen w-screen pt-16">
                <div className="grid grid-cols-1 flex p-4 mx-[1rem] ">
                    <p className="text-3xl text-white" onClick={handleClick}>Hello Kim</p>
                    <p>{granted ? "Granted" : "Not Granted"}</p>
                </div>
                <button ref={permsButtonRef} id="perms" className="text-white">Get Perms</button>
            </div>
        </>
    )
}