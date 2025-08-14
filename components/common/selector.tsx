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

export default function Selector({ value, textColor, placeholder, list, onChange }: any) {
    const color = textColor ?? 'text-slate-100';
    return (
        <View className="w-full">
            <Select defaultValue={value ?? placeholder} initialLabel={value ?? placeholder} selectedValue={value} className={`${color}`} closeOnOverlayClick={true} onValueChange={(itemValue) => {
                const selected = list.find((item: any) => item.name === itemValue);
                onChange(selected);
            }}>
                <SelectTrigger className="flex justify-between px-3 border-slate-200" variant="outline" size="xl">
                    <SelectInput className={`${color} font-light`}  />
                    <SelectIcon className={`${color} font-light`}  as={ChevronDownIcon} />
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