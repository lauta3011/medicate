import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  textStyle?: string;
  buttonStyle?: string;
  expandButtonText?: string;
  collapseButtonText?: string;
  showIcon?: boolean;
  numberOfLines?: number;
  animationDuration?: number;
}

export default function ExpandableText({
  text,
  maxLength = 100,
  textStyle = "text-slate-600 text-base leading-6",
  buttonStyle = "text-blue-500 font-medium",
  expandButtonText = "ver más...",
  collapseButtonText = "ver menos",
  showIcon = true,
  numberOfLines = 3,
  animationDuration = 300
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldTruncate, setShouldTruncate] = useState(false);
  const [hasCheckedLayout, setHasCheckedLayout] = useState(false);

  // Reset state when text changes
  useEffect(() => {
    setIsExpanded(false);
    setShouldTruncate(false);
    setHasCheckedLayout(false);
  }, [text]);

  // Don't render anything if text is empty
  if (!text || text.trim() === '') {
    return null;
  }

  // Handle text layout to determine if truncation is needed based on number of lines
  const handleTextLayout = (event: any) => {
    if (hasCheckedLayout) return;
    
    const { lines } = event.nativeEvent;
    if (lines.length > numberOfLines) {
      setShouldTruncate(true);
    }
    setHasCheckedLayout(true);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Check if text needs truncation based on character length
  const needsCharacterTruncation = text.length > maxLength;
  
  // Determine if we should show the expand/collapse button
  const shouldShowButton = shouldTruncate || needsCharacterTruncation;

  return (
    <View>
      <Text 
        className={textStyle}
        numberOfLines={isExpanded ? undefined : numberOfLines}
        onTextLayout={handleTextLayout}
      >
        {text}
      </Text>
      
      {shouldShowButton && (
        <Pressable 
          onPress={toggleExpanded} 
          className="mt-2"
          hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}
        >
          <View className="flex-row items-center">
            <Text className={buttonStyle}>
              {isExpanded ? collapseButtonText : expandButtonText}
            </Text>
            {showIcon && (
              <View className="ml-1">
                {isExpanded ? (
                  <ChevronUp size={16} color="#3b82f6" />
                ) : (
                  <ChevronDown size={16} color="#3b82f6" />
                )}
              </View>
            )}
          </View>
        </Pressable>
      )}
    </View>
  );
}

// Specialized version for service cards with consistent styling
interface ServiceCardTextProps {
  text: string;
  variant?: 'provider' | 'service';
}

export function ServiceCardText({ text, variant = 'service' }: ServiceCardTextProps) {
  const isProvider = variant === 'provider';
  
  return (
    <ExpandableText
      text={text}
      maxLength={isProvider ? 80 : 120}
      textStyle={isProvider ? "text-slate-600 text-sm" : "text-slate-600 text-base leading-6"}
      buttonStyle="text-blue-500 font-medium text-sm"
      expandButtonText="ver más..."
      collapseButtonText="ver menos"
      showIcon={true}
      numberOfLines={isProvider ? 2 : 3}
    />
  );
}