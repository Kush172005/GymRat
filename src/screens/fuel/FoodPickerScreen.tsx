import React, { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { AppHeader, AppText, Chip } from '../../components/ui';
import { FOODS, FoodItem, FoodCategory } from '../../data/foods';
import { nutritionRepo } from '../../db/nutritionRepo';
import { kcalFromMacros } from '../../domain/nutrition';

const CATEGORIES: Array<{ id: FoodCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'protein', label: 'Protein' },
  { id: 'carb', label: 'Carbs' },
  { id: 'veg', label: 'Veg' },
  { id: 'fruit', label: 'Fruit' },
  { id: 'dairy', label: 'Dairy' },
  { id: 'fat', label: 'Fats' },
  { id: 'snack', label: 'Snacks' },
];

export function FoodPickerScreen() {
  const { colors } = useTheme();
  const nav = useNavigation();
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<FoodCategory | 'all'>('all');
  const [custom, setCustom] = useState(false);
  const [name, setName] = useState('');
  const [p, setP] = useState('');
  const [c, setC] = useState('');
  const [f, setF] = useState('');

  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return FOODS.filter((food) => {
      const matchesSearch = !s || food.name.toLowerCase().includes(s);
      const matchesCategory = category === 'all' || food.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [q, category]);

  const addFood = (food: FoodItem, servings = 1) => {
    nutritionRepo.addLog({
      food_id: food.id,
      name: food.name,
      servings,
      protein_g: food.proteinG * servings,
      carbs_g: food.carbsG * servings,
      fat_g: food.fatG * servings,
      kcal: food.kcal * servings,
    });
    nav.goBack();
  };

  const addCustom = () => {
    const protein = parseFloat(p) || 0;
    const carbs = parseFloat(c) || 0;
    const fat = parseFloat(f) || 0;
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert('Name needed', 'Enter what you ate.');
      return;
    }
    nutritionRepo.addLog({
      food_id: `custom_${Date.now()}`,
      name: trimmed,
      servings: 1,
      protein_g: protein,
      carbs_g: carbs,
      fat_g: fat,
      kcal: kcalFromMacros(protein, carbs, fat),
    });
    nav.goBack();
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <AppHeader title="Log food" onBack={() => nav.goBack()} />
      <View style={styles.switchRow}>
        <Chip label="Common foods" selected={!custom} onPress={() => setCustom(false)} />
        <Chip label="Custom" selected={custom} onPress={() => setCustom(true)} />
      </View>

      {custom ? (
        <View style={styles.pad}>
          <Input colors={colors} value={name} onChange={setName} placeholder="Food name" />
          <Input colors={colors} value={p} onChange={setP} placeholder="Protein (g)" keyboard="decimal-pad" />
          <Input colors={colors} value={c} onChange={setC} placeholder="Carbs (g)" keyboard="decimal-pad" />
          <Input colors={colors} value={f} onChange={setF} placeholder="Fat (g)" keyboard="decimal-pad" />
          <AppText variant="caption" color="muted" style={{ marginBottom: spacing.lg }}>
            Calories = protein×4 + carbs×4 + fat×9
          </AppText>
          <TouchableOpacity style={[styles.save, { backgroundColor: colors.primary }]} onPress={addCustom}>
            <Text style={styles.saveText}>Add to today</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="search-outline" size={18} color={colors.textMuted} />
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Search chicken, eggs, rice…"
              placeholderTextColor={colors.textMuted}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>
          <View style={styles.categoryRow}>
            <FlatList
              horizontal
              data={CATEGORIES}
              keyExtractor={(c) => c.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: spacing.lg }}
              renderItem={({ item: c }) => (
                <Chip label={c.label} selected={category === c.id} onPress={() => setCategory(c.id)} />
              )}
            />
          </View>
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <FoodRow item={item} colors={colors} onAdd={(servings) => addFood(item, servings)} />
            )}
          />
        </>
      )}
    </View>
  );
}

function FoodRow({
  item,
  colors,
  onAdd,
}: {
  item: FoodItem;
  colors: { surface: string; border: string; surface2: string; primary: string; textMuted: string };
  onAdd: (servings: number) => void;
}) {
  const [qty, setQty] = useState(1);

  return (
    <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={{ flex: 1 }}>
        <AppText variant="bodySemiBold">{item.name}</AppText>
        <AppText variant="caption" color="sub">
          {item.serving} · {Math.round(item.proteinG * qty)} g protein · {Math.round(item.kcal * qty)} kcal
        </AppText>
      </View>
      <View style={styles.stepper}>
        <TouchableOpacity
          onPress={() => setQty((n) => Math.max(0.5, n - 0.5))}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={`Decrease servings of ${item.name}`}
        >
          <Ionicons name="remove-circle-outline" size={22} color={colors.textMuted} />
        </TouchableOpacity>
        <Text style={[styles.qtyText, { color: colors.textMuted }]}>{qty}×</Text>
        <TouchableOpacity
          onPress={() => setQty((n) => n + 0.5)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={`Increase servings of ${item.name}`}
        >
          <Ionicons name="add-circle-outline" size={22} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => onAdd(qty)}
        accessibilityRole="button"
        accessibilityLabel={`Add ${qty} serving of ${item.name}`}
      >
        <Ionicons name="add-circle" size={28} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

function Input({
  colors, value, onChange, placeholder, keyboard = 'default',
}: {
  colors: { text: string; surface: string; border: string; textMuted: string };
  value: string;
  onChange: (t: string) => void;
  placeholder: string;
  keyboard?: 'default' | 'decimal-pad';
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      keyboardType={keyboard}
      style={[styles.input, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  switchRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  pad: { padding: spacing.lg },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  searchInput: { flex: 1, paddingVertical: spacing.md, fontFamily: fontFamily.body.regular, fontSize: fontSize.md },
  categoryRow: { marginBottom: spacing.sm },
  list: { padding: spacing.lg, paddingBottom: 40 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  qtyText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: fontSize.sm,
    minWidth: 28,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
  },
  save: { padding: spacing.lg, borderRadius: radius.lg, alignItems: 'center' },
  saveText: { color: '#fff', fontFamily: fontFamily.body.bold, fontSize: fontSize.md },
});
