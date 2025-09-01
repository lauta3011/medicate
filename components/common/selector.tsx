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
    // Extract the display value properly
    const displayValue = value?.name || placeholder;
    const selectedValue = value?.name || '';
    
    return (
        <View className="w-full">
            <Select placeholder={placeholder} defaultValue={displayValue} initialLabel={displayValue} selectedValue={selectedValue} closeOnOverlayClick={true} onValueChange={(itemValue) => {
                const selected = list.find((item: any) => item.name === itemValue);
                onChange(selected);
            }}>
                <SelectTrigger variant="outline" size="xl">
                    <SelectInput />
                    <SelectIcon as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
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