import { Input, InputField } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { Check, Edit3, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function EditableDescription() {
    const { profile, updateDescription } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [tempDescription, setTempDescription] = useState(profile?.description || '');

    const handleEdit = () => {
        setTempDescription(profile?.description || '');
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (tempDescription.trim()) {
            await updateDescription(tempDescription.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setTempDescription(profile?.description || '');
        setIsEditing(false);
    };

    const showPlaceholder = !profile?.description || profile.description === 'hardcoded aaaa';

    if (isEditing) {
        return (
            <View >
                <View className="flex flex-row justify-between">
                    <Text className="text-slate-400 text-lg mb-2">Descripción</Text>
                    <View className="flex-row justify-end gap-2">
                        <Pressable 
                            onPress={handleCancel}
                            className="w-10 h-10 rounded-full bg-slate-600 items-center justify-center active:bg-slate-500"
                        >
                            <X size={20} color="#f1f5f9" />
                        </Pressable>
                        <Pressable 
                            onPress={handleSave}
                            className="w-10 h-10 rounded-full bg-green-600 items-center justify-center active:bg-green-500"
                        >
                            <Check size={20} color="#f1f5f9" />
                        </Pressable>
                    </View>
                </View>
                <Input
                    variant="outline"
                    size="lg"
                    className="bg-slate-700 border-slate-600 mb-4"
                    style={{ minHeight: 60 }}
                >
                    <InputField
                        value={tempDescription}
                        onChangeText={setTempDescription}
                        placeholder="Breve descripción de ti"
                        className="text-slate-50 text-base"
                        multiline
                        numberOfLines={4}
                        style={{ 
                            textAlignVertical: 'top',
                            minHeight: 30
                        }}
                    />
                </Input>
            </View>
        );
    }

    return (
        <View >
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-slate-400 text-lg">Descripción</Text>
                <Pressable 
                    onPress={handleEdit}
                    className="w-8 h-8 rounded-full bg-slate-600 items-center justify-center active:bg-slate-500"
                >
                    <Edit3 size={16} color="#f1f5f9" />
                </Pressable>
            </View>
            
            {showPlaceholder ? (
                <Pressable 
                    onPress={handleEdit}
                    className="rounded-lg p-4 border-2 border-dashed border-slate-500"
                >
                    <Text className="text-slate-400 text-base italic">
                        Toca aquí para agregar una breve descripción de ti
                    </Text>
                </Pressable>
            ) : (
                <Pressable 
                    onPress={handleEdit}
                    className="bg-slate-700 rounded-lg p-4"
                >
                    <Text className="text-slate-50 text-base leading-6">
                        {profile?.description}
                    </Text>
                </Pressable>
            )}
        </View>
    );
}