# Expandable Text Component - Implementation Guide

## Overview
Added "see more..." functionality to service cards for both provider descriptions and service offer descriptions when text is too long.

## 🎯 What Was Implemented

### 1. New Component: `ExpandableText`
Location: `components/common/expandable-text.tsx`

**Features:**
- Line-based truncation (e.g., show only 3 lines)
- Character-based truncation (e.g., show only 100 characters)
- Smooth expand/collapse with icons
- Customizable styling and text
- Auto-detection of text overflow
- Spanish language support

### 2. Specialized Component: `ServiceCardText`
Pre-configured for service cards with optimized settings:

**Provider variant:**
- 2 lines maximum
- 80 characters limit
- Smaller text size
- Optimized for user descriptions

**Service variant:**
- 3 lines maximum  
- 120 characters limit
- Standard text size
- Optimized for service descriptions

### 3. Integration with Service Cards
Updated `components/common/service-card.tsx` to use expandable text for:
- Provider descriptions (in the gray info box)
- Service offer descriptions (main description)

## 🎨 Visual Design

### Collapsed State
```
This is a long description that gets truncated when it exceeds the maximum...
ver más... ↓
```

### Expanded State
```
This is a long description that gets truncated when it exceeds the maximum
number of lines or characters. Now you can see the full text with all the
details that were previously hidden from view.
ver menos ↑
```

## 💻 Usage Examples

### Basic Usage
```tsx
import ExpandableText from "@/components/common/expandable-text";

<ExpandableText 
  text="This is a long description that might need truncation..."
  numberOfLines={3}
  maxLength={100}
/>
```

### Service Card Usage (Automatic)
```tsx
import { ServiceCardText } from "@/components/common/expandable-text";

// For provider descriptions
<ServiceCardText 
  text={userProfile.description} 
  variant="provider" 
/>

// For service descriptions  
<ServiceCardText 
  text={serviceDescription} 
  variant="service" 
/>
```

### Custom Styling
```tsx
<ExpandableText 
  text="Custom styled text..."
  textStyle="text-gray-800 text-lg font-medium"
  buttonStyle="text-red-500 font-bold"
  expandButtonText="show more"
  collapseButtonText="show less"
  showIcon={false}
/>
```

## ⚙️ Component Props

### ExpandableText Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | required | The text content to display |
| `maxLength` | number | 100 | Character limit before truncation |
| `textStyle` | string | "text-slate-600..." | Tailwind classes for text styling |
| `buttonStyle` | string | "text-blue-500..." | Tailwind classes for button styling |
| `expandButtonText` | string | "ver más..." | Text for expand button |
| `collapseButtonText` | string | "ver menos" | Text for collapse button |
| `showIcon` | boolean | true | Show chevron up/down icons |
| `numberOfLines` | number | 3 | Maximum lines before truncation |

### ServiceCardText Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | required | The text content to display |
| `variant` | 'provider' \| 'service' | 'service' | Pre-configured settings |

## 🎯 Truncation Logic

The component uses two methods to determine if text should be truncated:

1. **Line-based**: Uses `onTextLayout` to count rendered lines
2. **Character-based**: Simple string length comparison

Text is truncated if either condition is met.

## 🔧 Configuration Details

### Provider Variant Settings
- **Lines**: 2 maximum
- **Characters**: 80 limit  
- **Text Style**: `text-slate-600 text-sm`
- **Use Case**: User profile descriptions in service cards

### Service Variant Settings  
- **Lines**: 3 maximum
- **Characters**: 120 limit
- **Text Style**: `text-slate-600 text-base leading-6`
- **Use Case**: Service offer descriptions

## 📱 Responsive Behavior

- **Touch Target**: Larger hit area for better mobile interaction
- **Icon Feedback**: Visual indicators for expand/collapse state  
- **Consistent Spacing**: Proper margins and padding
- **Accessibility**: Clear button text for screen readers

## 🚀 Testing Scenarios

### Short Text (No Truncation)
```
"Breve descripción"
```
Result: No "ver más" button appears

### Medium Text (Character Truncation)
```
"Esta es una descripción mediana que supera el límite de caracteres pero no necesariamente el de líneas..."
```
Result: Shows "ver más..." button

### Long Text (Line Truncation)
```
"Esta es una descripción muy larga que definitivamente superará
tanto el límite de caracteres como el número máximo de líneas
permitidas en la configuración del componente, activando así
la funcionalidad de truncación por líneas."
```
Result: Shows "ver más..." button

### Edge Cases
- Empty string: Component returns null
- Only whitespace: Component returns null  
- HTML/Special characters: Handled normally
- Very long single word: Breaks naturally

## 🎨 Visual Examples in Service Cards

### Before (Without Expandable Text)
```
Provider: Juan Pérez
Soy un desarrollador con más de 10 años de experiencia en tecnologías web, especializado en React, Node.js, y bases de datos. He trabajado con empresas grandes y pequeñas...

Service: Desarrollo de aplicaciones web
Ofrezco servicios de desarrollo de aplicaciones web completas usando las últimas tecnologías. Incluye diseño responsive, integración con APIs, optimización de performance, testing automatizado, deployment y mantenimiento continuo...
```

### After (With Expandable Text)
```
Provider: Juan Pérez  
Soy un desarrollador con más de 10 años de experiencia en tecnologías web...
ver más... ↓

Service: Desarrollo de aplicaciones web
Ofrezco servicios de desarrollo de aplicaciones web completas usando las últimas tecnologías. Incluye diseño responsive...
ver más... ↓
```

## 🔮 Future Enhancements

- **Animation**: Smooth height transitions
- **Read Time**: Estimated reading time for long texts
- **Internationalization**: Multiple language support
- **Analytics**: Track expansion rates
- **Custom Breakpoints**: Device-specific truncation limits
- **Rich Text**: Support for formatted text and links

## 📁 Files Modified

### New Files
- `components/common/expandable-text.tsx` - Main component
- `EXPANDABLE_TEXT_EXAMPLES.md` - This documentation

### Modified Files  
- `components/common/service-card.tsx` - Integrated expandable text

## ✅ Benefits

1. **Better UX**: Clean, scannable service cards
2. **Information Density**: More services visible at once  
3. **User Control**: Users choose what to read in detail
4. **Mobile Friendly**: Less scrolling on small screens
5. **Consistent Design**: Uniform truncation across the app
6. **Performance**: Faster initial rendering
7. **Accessibility**: Clear expand/collapse actions