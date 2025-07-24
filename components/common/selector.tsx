import { View } from "react-native";
import { ChevronDownIcon } from "../ui/icon";
import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from "../ui/select";

export default function Selector({ value, placeholder, list, onChange }: any) {
    return (
        <View className="w-full">
            <Select selectedValue={value} closeOnOverlayClick={true} onValueChange={(itemValue) => {
                const selected = list.find((item: any) => item.name === itemValue);
                onChange(selected);
            }}>
                <SelectTrigger className="flex justify-between px-3" variant="outline" size="xl">
                    <SelectInput className="text-slate-100 font-light" placeholder={placeholder} />
                    <SelectIcon className="text-slate-100 font-light"  as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal className="pb-8">
                    <SelectBackdrop />
                    <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                            {list?.map((item: any, index: number) => {
                                return <SelectItem key={index} label={item.name} value={item.name} />
                            })}
                    </SelectContent>
                </SelectPortal>
            </Select>
        </View>
    )
}