import { useState, useEffect } from "react";
import React from "react";
import Nav from "../components/nav"
import RenderCards from "../components/renderCards";

export default function Welcome() {
    return (
        <>
            <Nav />
            <RenderCards/>
        </>
    )
}