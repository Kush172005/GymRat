import React, { useMemo, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { useTheme } from '../../theme';
import { fontFamily, fontSize } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { Screen, AppHeader, AppText, Chip, Button, Card } from '../../components/ui';
import { profileRepo } from '../../db/profileRepo';
import { settingsRepo } from '../../db/settingsRepo';
import { ACTIVITY_OPTIONS, GOAL_OPTIONS } from '../../domain/profile';
import { computeTargets } from '../../domain/nutrition';
import { cmToFtIn, displayWeight, ftInToCm, parseWeightInput } from '../../utils/units';

const empty = {
  name: '',
  sex: 'male',
  age: 25,
  heightCm: 175,
  weightKg: 75,
  activity: 'moderate',
  experience: 'beginner',
  daysPerWeek: 3,
  mealsPerDay: 4,
  goal: 'gain_muscle',
};

export function ProfileSetupScreen({ navigation }) {
  const { colors } = useTheme();
  const units = settingsRepo.getUnits();
  const existing = profileRepo.get();
  const [step, setStep] = useState(0);
  const [p, setP] = useState(existing ?? empty);
  const [ageStr, setAgeStr] = useState(String(p.age));
  const [weightStr, setWeightStr] = useState(displayWeight(p.weightKg, units));
  const [targetStr, setTargetStr] = useState(
    p.targetWeightKg ? displayWeight(p.targetWeightKg, units) : '',
  );
  const ftIn = cmToFtIn(p.heightCm);
  const [cmStr, setCmStr] = useState(String(Math.round(p.heightCm)));
  const [ftStr, setFtStr] = useState(String(ftIn.ft));
  const [inStr, setInStr] = useState(String(ftIn.inch));

  const preview = useMemo(() => computeTargets(hydrate(p, ageStr, weightStr, cmStr, ftStr, inStr, units, targetStr)), [
    p, ageStr, weightStr, cmStr, ftStr, inStr, units, targetStr,
  ]);

  const saveAndClose = () => {
    const profile = hydrate(p, ageStr, weightStr, cmStr, ftStr, inStr, units, targetStr);
    if (profile.age < 14 || profile.age > 90 || profile.weightKg < 30 || profile.heightCm < 120) {
      Alert.alert('Check your stats', 'Age 14–90, weight at least 30 kg, height at least 120 cm.');
      return;
    }
    if (profile.goal === 'increase_lift' && !profile.liftFocus) {
      profile.liftFocus = 'bench';
    }
    profileRepo.save(profile);
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  const skip = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <Screen>
      <AppHeader
        title={existing ? 'Your goals' : 'Set up your goals'}
        onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        rightAction={
          existing
            ? undefined
            : { icon: 'close-outline', label: 'Skip for now', onPress: skip }
        }
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.pad} keyboardShouldPersistTaps="handled">
          {step === 0 && (
            <>
              <AppText variant="label" color="muted">Your name</AppText>
              <TextInput
                value={p.name ?? ''}
                onChangeText={(t) => setP({ ...p, name: t })}
                placeholder="e.g. Kush"
                placeholderTextColor={colors.textMuted}
                style={[styles.input, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border, marginTop: spacing.sm, marginBottom: spacing.xl }]}
                accessibilityLabel="Your name"
                returnKeyType="next"
                maxLength={40}
              />

              <AppText variant="title3">What are you training for?</AppText>
              <AppText variant="body" color="sub" style={styles.lead}>
                Targets (calories, protein, steps, and a plan) are calculated from this — not guessed.
              </AppText>
              <View style={styles.wrap}>
                {GOAL_OPTIONS.map((g) => (
                  <Chip
                    key={g.id}
                    label={g.label}
                    selected={p.goal === g.id}
                    onPress={() => setP({ ...p, goal: g.id })}
                    style={styles.chip}
                  />
                ))}
              </View>
              {p.goal === 'increase_lift' && (
                <View style={[styles.wrap, { marginTop: spacing.md }]}>
                  {['bench', 'squat', 'deadlift', 'ohp'].map((lift) => (
                    <Chip
                      key={lift}
                      label={lift === 'ohp' ? 'Overhead press' : lift[0].toUpperCase() + lift.slice(1)}
                      selected={p.liftFocus === lift}
                      onPress={() => setP({ ...p, liftFocus: lift })}
                      style={styles.chip}
                    />
                  ))}
                </View>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <AppText variant="title3">Body stats</AppText>
              <AppText variant="body" color="sub" style={styles.lead}>
                Used for Mifflin–St Jeor BMR. Update when your weight changes.
              </AppText>
              <AppText variant="label" color="muted">Sex</AppText>
              <View style={styles.wrap}>
                {['male', 'female'].map((s) => (
                  <Chip key={s} label={s === 'male' ? 'Male' : 'Female'} selected={p.sex === s} onPress={() => setP({ ...p, sex: s })} style={styles.chip} />
                ))}
              </View>
              <Field label="Age" value={ageStr} onChange={setAgeStr} keyboard="number-pad" colors={colors} />
              {units === 'lb' ? (
                <View style={styles.row2}>
                  <View style={{ flex: 1 }}>
                    <Field label="Height (ft)" value={ftStr} onChange={setFtStr} keyboard="number-pad" colors={colors} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Field label="Height (in)" value={inStr} onChange={setInStr} keyboard="decimal-pad" colors={colors} />
                  </View>
                </View>
              ) : (
                <Field label="Height (cm)" value={cmStr} onChange={setCmStr} keyboard="decimal-pad" colors={colors} />
              )}
              <Field
                label={`Weight (${units})`}
                value={weightStr}
                onChange={setWeightStr}
                keyboard="decimal-pad"
                colors={colors}
              />
              {(p.goal === 'lose_weight' || p.goal === 'gain_muscle' || p.goal === 'maintain') && (
                <Field
                  label={`Target weight (${units}), optional`}
                  value={targetStr}
                  onChange={setTargetStr}
                  keyboard="decimal-pad"
                  colors={colors}
                />
              )}
            </>
          )}

          {step === 2 && (
            <>
              <AppText variant="title3">How you live and train</AppText>
              <AppText variant="label" color="muted" style={{ marginTop: spacing.lg }}>Daily activity</AppText>
              <View style={styles.wrap}>
                {ACTIVITY_OPTIONS.map((a) => (
                  <Chip
                    key={a.id}
                    label={a.label}
                    selected={p.activity === a.id}
                    onPress={() => setP({ ...p, activity: a.id })}
                    style={styles.chip}
                  />
                ))}
              </View>
              {ACTIVITY_OPTIONS.find((a) => a.id === p.activity) ? (
                <AppText variant="caption" color="muted" style={{ marginBottom: spacing.sm }}>
                  {ACTIVITY_OPTIONS.find((a) => a.id === p.activity)?.blurb}
                </AppText>
              ) : null}
              <AppText variant="label" color="muted" style={{ marginTop: spacing.lg }}>Experience</AppText>
              <View style={styles.wrap}>
                {['beginner', 'intermediate'].map((e) => (
                  <Chip key={e} label={e === 'beginner' ? 'Beginner' : 'Intermediate'} selected={p.experience === e} onPress={() => setP({ ...p, experience: e })} style={styles.chip} />
                ))}
              </View>
              <AppText variant="label" color="muted" style={{ marginTop: spacing.lg }}>Gym days / week</AppText>
              <View style={styles.wrap}>
                {[2, 3, 4, 5, 6].map((n) => (
                  <Chip key={n} label={`${n}`} selected={p.daysPerWeek === n} onPress={() => setP({ ...p, daysPerWeek: n })} style={styles.chip} />
                ))}
              </View>
              <AppText variant="label" color="muted" style={{ marginTop: spacing.lg }}>Meals / day</AppText>
              <View style={styles.wrap}>
                {[3, 4, 5].map((n) => (
                  <Chip key={n} label={`${n}`} selected={p.mealsPerDay === n} onPress={() => setP({ ...p, mealsPerDay: n })} style={styles.chip} />
                ))}
              </View>
            </>
          )}

          {step === 3 && (
            <>
              <AppText variant="title3">Your measurable targets</AppText>
              <AppText variant="caption" color="sub" style={styles.lead}>
                Protein {preview.proteinG} g · {preview.calories} kcal · {preview.stepGoal.toLocaleString()} steps · {p.daysPerWeek} training days
              </AppText>
              <Card>
                <Row k="BMR" v={`${preview.bmr} kcal`} />
                <Row k="TDEE" v={`${preview.tdee} kcal`} />
                <Row k="Daily calories" v={`${preview.calories} (${preview.calorieDelta >= 0 ? '+' : ''}${preview.calorieDelta})`} />
                <Row k="Protein" v={`${preview.proteinG} g`} />
                <Row k="Carbs" v={`${preview.carbsG} g`} />
                <Row k="Fat" v={`${preview.fatG} g`} />
                <Row k="Per meal protein" v={`${preview.proteinPerMealG} g × ${p.mealsPerDay}`} />
                <Row k="Water" v={`${preview.waterMl} ml`} />
                <Row k="Step goal" v={`${preview.stepGoal.toLocaleString()}`} />
                <Row k="BMI" v={`${preview.bmi}`} />
              </Card>
              {preview.methodNotes.map((n) => (
                <AppText key={n} variant="caption" color="muted" style={{ marginTop: spacing.sm }}>
                  {n}
                </AppText>
              ))}
            </>
          )}

          <View style={styles.navRow}>
            {step > 0 && (
              <Button title="Back" variant="ghost" onPress={() => setStep(step - 1)} />
            )}
            {step < 3 ? (
              <Button title="Next" onPress={() => setStep(step + 1)} style={{ marginLeft: 'auto' }} />
            ) : (
              <Button title="Save targets" onPress={saveAndClose} style={{ marginLeft: 'auto' }} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function hydrate(p, ageStr, weightStr, cmStr, ftStr, inStr, units, targetStr) {
  const age = parseInt(ageStr, 10) || p.age;
  const weightKg = parseWeightInput(weightStr, units) || p.weightKg;
  const heightCm =
    units === 'lb'
      ? ftInToCm(parseFloat(ftStr) || 0, parseFloat(inStr) || 0)
      : parseFloat(cmStr) || p.heightCm;
  const parsedTarget = targetStr.trim() ? parseWeightInput(targetStr, units) : 0;
  return {
    ...p,
    age,
    weightKg,
    heightCm,
    targetWeightKg: parsedTarget > 0 ? parsedTarget : undefined,
  };
}

function Field({ label, value, onChange, keyboard, colors }) {
  return (
    <View style={{ marginTop: spacing.lg }}>
      <AppText variant="label" color="muted">{label}</AppText>
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType={keyboard}
        style={[styles.input, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]}
        placeholderTextColor={colors.textMuted}
      />
    </View>
  );
}

function Row({ k, v }) {
  return (
    <View style={styles.kv}>
      <AppText variant="body" color="sub">{k}</AppText>
      <AppText variant="bodySemiBold">{v}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: { padding: spacing.lg, paddingBottom: 80 },
  lead: { marginTop: spacing.sm, marginBottom: spacing.lg },
  wrap: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { marginBottom: spacing.sm },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
    marginTop: spacing.sm,
  },
  row2: { flexDirection: 'row', gap: spacing.md },
  navRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing['2xl'] },
  kv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
});
