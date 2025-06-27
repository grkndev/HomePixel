import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react'
import { Keyboard, TouchableOpacity, View } from 'react-native'
import Icons from './Icons'

const TabBarComponent = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        // Cleanup
        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    const currentRoute = state.routes[state.index].name
    return (
        <>
            {!isKeyboardVisible && (
                <View className='border-zinc-800 border-t bg-zinc-950 flex flex-row items-center justify-around w-full h-24'>
                    {/* HOME */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("index")}
                        className={`flex h-full w-1/4 items-center justify-center gap-1`}>

                        <Icons name={"House"} color={currentRoute === 'index' ? '#FA0250' : '#71717a'} />
                        {/* <Text
                            className={
                                cn(
                                    'text-xs ',
                                    currentRoute === 'index' ? ' font-bold text-[#FA0250]' : 'text-zinc-500'
                                )

                            }>Anasayfa</Text> */}
                    </TouchableOpacity>

                    {/* COLOR PALETTE */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("colorpalette")}
                        className={`flex h-full w-1/4 items-center justify-center gap-1`}>

                        <Icons name={"Palette"} color={currentRoute === 'colorpalette' ? '#FA0250' : '#a1a1aa'} />
                        {/* <Text
                            className={

                                cn(
                                    'text-xs',
                                    currentRoute === 'colorpalette' ? ' font-bold text-[#FA0250]' : 'text-zinc-400'
                                )
                            }>Renk Paleti</Text> */}
                    </TouchableOpacity>

                    {/* SAVED */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("saved")}
                        className={`flex h-full w-1/4 items-center justify-center gap-1`}>

                        <Icons name={"Save"} color={currentRoute === 'saved' ? '#FA0250' : '#a1a1aa'} />
                        {/* <Text
                            className={

                                cn(
                                    'text-xs',
                                    currentRoute === 'saved' ? ' font-bold text-[#FA0250]' : 'text-zinc-400'
                                )
                            }>Kaydedilenler</Text> */}
                    </TouchableOpacity>




                </View>)}</>
    )
}

export default TabBarComponent