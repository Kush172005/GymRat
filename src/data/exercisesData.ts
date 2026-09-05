interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  description: string;
  beginnerTips: string;
  videoUrl?: string;
}

export const EXERCISE_DATA: Exercise[] = [
  {
    id: "1",
    name: "Barbell Bench Press",
    bodyPart: "Chest",
    equipment: "Barbell, Bench",
    image: require("../../assets/images/ListScreen/1-barbell-bench-press.jpg"),
    description:
      "1. Setup: Lie flat on a bench, feet firmly on the ground. \n2. Grip: Grab the bar with hands slightly wider than your shoulders. Squeeze the bar tightly.\n3. Un-rack: Take a deep breath, and press the bar straight up to un-rack it. Move it directly over your mid-chest.\n4. Lower: Slowly lower the bar to your chest, keeping your elbows angled down (about 45 degrees from your body).\n5. Press: When the bar lightly touches your chest, drive your feet into the floor and explosively push the bar straight back up until your arms are locked.",
    beginnerTips:
      "• Control the weight at all times; never let it freefall. \n• Keep your elbows tucked slightly towards your body (45-degree angle). \n• Press your shoulders down and back into the bench. \n• Take a deep breath at the top and hold it while lowering the bar.",
    videoUrl: "https://www.youtube.com/watch?v=EUjh50tLlBo",
  },
  {
    id: "2",
    name: "Barbell Squat",
    bodyPart: "Legs",
    equipment: "Barbell, Rack",
    image: require("../../assets/images/ListScreen/2-barbell-squat.jpg"),
    description:
      "1. Setup: Place the bar across the top of your back muscles (traps), NOT your neck. Stand with feet shoulder-width apart, toes pointed slightly out.\n2. Brace: Take a deep breath, and squeeze your stomach muscles (core) as hard as you can.\n3. Descend: Push your hips backward and bend your knees. Keep your chest high and your back straight.\n4. Depth: Go down until your hip crease is lower than the top of your knees (or as deep as you comfortably can).\n5. Ascend: Drive your heels into the floor and stand up explosively, squeezing your glutes (butt muscles) at the top.",
    beginnerTips:
      "• Focus on keeping your chest up and back straight. \n• Your knees should track in the same direction as your toes. \n• Start with just the empty bar or a lighter weight to perfect your form.",
    videoUrl: "https://www.youtube.com/watch?v=eMYjBnIVb_A",
  },
  {
    id: "3",
    name: "Barbell Deadlift (Conventional)",
    bodyPart: "Back, Legs",
    equipment: "Barbell",
    image: require("../../assets/images/ListScreen/3-deadlift.jpg"),
    description:
      "1. Position: Stand with the bar over the middle of your feet.\n2. Grip: Bend down and grab the bar just outside your shins. Your shins should be touching the bar.\n3. Set Up: Drop your hips slightly, lift your chest, and pull the slack out of the bar. Your back should be completely flat.\n4. Lift: Drive through your heels. Keep your back angle the same as you stand up. Keep the bar touching your legs the entire time.\n5. Finish: Finish the lift by locking your knees and hips completely. Do NOT lean back. Reverse the motion slowly to put the bar down.",
    beginnerTips:
      "• Back is King: The number one rule is to keep your back perfectly flat and straight. Never round your back.\n• Hinge First: When lowering the bar, initiate the movement by pushing your hips back, not by bending your knees.\n• Control the Drop: Don't just drop the weight! Control it all the way down to maintain muscle tension.",
    videoUrl: "https://www.youtube.com/watch?v=3UwO0fKukRw",
  },
  {
    id: "4",
    name: "Barbell Overhead Press",
    bodyPart: "Shoulders",
    equipment: "Barbell",
    image: require("../../assets/images/ListScreen/4-overhead-press.jpg"),
    description:
      "1. Setup: Hold the barbell at your upper chest, slightly wider than shoulder-width.\n2. Brace: Squeeze your glutes and abs tightly—this protects your lower back.\n3. Press: Push the bar straight up. As the bar passes your head, gently push your head forward (this keeps the bar over your center of gravity).\n4. Lockout: Lock your elbows out fully at the top, finishing with the bar directly over your ears.\n5. Lower: Lower the bar back down slowly and under control to the start position.",
    beginnerTips:
      "• No Arch: Avoid arching your back heavily. Use the glute/ab squeeze to keep your core stiff.\n• Full Extension: Don't stop short at the top. Get that full, strong arm lock-out.\n• Smooth Motion: Aim for a single, powerful, non-jerky movement from chest to overhead.",
    videoUrl: "https://www.youtube.com/watch?v=2yjwXTZQDDI",
  },
  {
    id: "5",
    name: "Pull-Up",
    bodyPart: "Back",
    equipment: "Pull-up Bar",
    image: require("../../assets/images/ListScreen/5-pull-up.jpg"),
    description:
      "1. Grip: Grab the bar with an overhand grip (palms facing away), hands slightly wider than shoulders.\n2. Hang: Start from a dead hang (arms fully straight).\n3. Initiate: Pull your shoulder blades down and back. Then, start bending your elbows.\n4. Pull: Pull your body up until your chin is over the bar, focusing on leading with your chest.\n5. Descend: Lower yourself slowly and fully back to the dead hang position.",
    beginnerTips:
      "• Control is Key: Lowering yourself slowly is just as important as pulling up.\n• Avoid Kipping: Don't swing your legs or body to gain momentum. Focus on a strict pull.\n• Scaling: If you can't do a full pull-up yet, use resistance bands or negative reps (only focus on lowering slowly from the top).",
    videoUrl: "https://www.youtube.com/watch?v=XB_7En-zf_M",
  },
  {
    id: "6",
    name: "Dumbbell Bicep Curl",
    bodyPart: "Biceps",
    equipment: "Dumbbells",
    image: require("../../assets/images/ListScreen/6-bicep-curl.jpg"),
    description:
      "1. Setup: Stand tall, holding a dumbbell in each hand, palms facing forward (or to the sides for a hammer curl).\n2. Curl: Bend your elbow to curl the weight up toward your shoulder. Keep your upper arm completely still.\n3. Squeeze: Pause and squeeze your bicep muscle hard at the highest point.\n4. Lower: Slowly lower the weight back down to full arm extension. Control the weight all the way.",
    beginnerTips:
      "• Elbows Locked: Keep your elbows pinned to your sides—they should not travel forward or back.\n• No Swing: Don't lean back to help lift the weight. If you have to swing, the weight is too heavy.\n• Feel the Muscle: Concentrate on flexing your bicep throughout the movement.",
    videoUrl: "https://www.youtube.com/watch?v=ICAXJVmOJik",
  },
  {
    id: "7",
    name: "Dumbbell Tricep Ext.",
    bodyPart: "Triceps",
    equipment: "Dumbbell",
    image: require("../../assets/images/ListScreen/7-tricep-ext.jpg"),
    description:
      "1. Setup: Sit or stand holding one dumbbell with both hands overhead, arms fully extended.\n2. Lower: Slowly bend your elbows, lowering the dumbbell behind your head until your forearms are parallel to the floor.\n3. Stretch: You should feel a deep stretch in your triceps at the bottom.\n4. Extend: Press the weight back up to the starting position using only your tricep muscles. Lock your arms out fully.",
    beginnerTips:
      "• Core Tight: Squeeze your abs and glutes to avoid arching your lower back.\n• Elbow Position: Keep your elbows pointing forward and tucked close to your head.\n• Upper Arm Fixed: Only your forearms should be moving during the exercise.",
    videoUrl: "https://www.youtube.com/watch?v=xbNm9fRoUTw",
  },
  {
    id: "8",
    name: "Crunches",
    bodyPart: "Core",
    equipment: "None",
    image: require("../../assets/images/ListScreen/8-crunches.jpg"),
    description:
      "1. Setup: Lie on your back with knees bent and feet flat on the floor. Hands can be crossed over your chest or lightly touching your temples.\n2. Lift: Exhale and contract your abdominal muscles to gently lift your head and shoulder blades off the floor.\n3. Contract: Focus on shortening the distance between your rib cage and your hips. Only lift a few inches off the floor.\n4. Lower: Slowly inhale and lower your shoulders back down without resting your head completely.",
    beginnerTips:
      "• Hands Light: Do NOT pull your neck forward with your hands. The movement should come entirely from your stomach muscles.\n• Quality Over Quantity: 10 slow, perfect crunches are better than 50 fast, sloppy ones.\n• Chin Up: Keep a space between your chin and chest (like holding an orange) to protect your neck.",
    videoUrl: "https://www.youtube.com/watch?v=4hmQA3snTyk",
  },
  {
    id: "9",
    name: "Plank",
    bodyPart: "Core",
    equipment: "None",
    image: require("../../assets/images/ListScreen/9-plank.jpg"),
    description:
      "1. Setup: Start on the floor on your hands and knees, then lower yourself onto your forearms. Your elbows should be directly under your shoulders.\n2. Body Line: Extend your legs behind you so your body forms a straight line from your head to your heels.\n3. Engage: Squeeze your glutes, quadriceps, and abdominal muscles intensely.\n4. Hold: Keep this rigid, straight position for a set time (e.g., 30-60 seconds). Do not let your hips sag.",
    beginnerTips:
      "• Avoid Sagging: The biggest mistake is letting the hips drop. Squeeze your butt hard to keep your hips level.\n• Hands Position: You can clasp your hands together if it's more comfortable.\n• Breathing: Breathe deeply and steadily. Don't hold your breath while holding the position.",
    videoUrl: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
  },
  {
    id: "10",
    name: "Leg Press",
    bodyPart: "Legs",
    equipment: "Machine",
    image: require("../../assets/images/ListScreen/10-leg-press.jpg"),
    description:
      "1. Setup: Sit in the machine and place your feet shoulder-width apart on the platform. Your back should be flat against the seat pad.\n2. Press: Push the platform up to release the safety handles. Do not lock your knees.\n3. Lower: Slowly lower the platform until your knees are bent at about a 90-degree angle.\n4. Drive: Push through your heels and the balls of your feet to press the platform back up to the starting position.",
    beginnerTips:
      "• Knee Safety: NEVER lock your knees out straight at the top—always keep a small bend.\n• Back Contact: Keep your entire back, especially your lower back, pressed firmly into the seat.\n• Foot Position: Feet lower on the platform targets quads more; feet higher targets glutes and hamstrings more.",
    videoUrl: "https://www.youtube.com/watch?v=_gIdzap4Hrg",
  },
  {
    id: "11",
    name: "Lateral Dumbbell Raise",
    bodyPart: "Shoulders",
    equipment: "Dumbbells",
    image: require("../../assets/images/ListScreen/11-lateral-raise.jpg"),
    description:
      "1. Setup: Stand tall holding a light dumbbell in each hand at your sides. Keep a slight bend in your elbows.\n2. Lift: Lift the dumbbells out and up to your sides. The movement should start from your shoulder, not your traps.\n3. Peak: Stop when your arms are parallel to the floor (shoulder height). Your pinkies should be slightly higher than your thumbs (like pouring water).\n4. Lower: Slowly lower the weights back down to the starting position. Control the weight, don't just drop it.",
    beginnerTips:
      "• Use LIGHT Weight: This exercise requires precision. If you're swinging your body, the weight is too heavy.\n• Shoulder Focus: Only raise the weight to shoulder height. Going higher uses other muscles.\n• Minimize Swing: Keep your body rigid and avoid swinging your torso to help lift the dumbbells.",
    videoUrl: "https://www.youtube.com/watch?v=JIhbYYA1Q90",
  },
  {
    id: "12",
    name: "Dumbbell Lunges",
    bodyPart: "Legs",
    equipment: "Dumbbells",
    image: require("../../assets/images/ListScreen/12-dumbbell-lunge.jpg"),
    description:
      "1. Setup: Stand tall, holding a dumbbell in each hand, arms relaxed.\n2. Step: Take a controlled step forward with one leg.\n3. Descend: Lower your hips straight down until both knees are bent at a 90-degree angle.\n4. Form Check: Your back knee should hover just above the floor, and your front knee should be directly over your ankle.\n5. Return: Push off the ground with your front foot to stand back up to the starting position. Repeat with the other leg.",
    beginnerTips:
      "• 90/90: Aim for two 90-degree bends (front knee and back knee).\n• Front Heel: Keep the heel of your front foot planted firmly on the ground the entire time.\n• Core Balance: Use a light weight or no weight at all initially to focus purely on balance and stability.",
    videoUrl: "https://www.youtube.com/watch?v=lrhTa-GqCPY",
  },
  {
    id: "13",
    name: "Push-Up",
    bodyPart: "Chest",
    equipment: "None",
    image: require("../../assets/images/ListScreen/13-push-up.jpg"),
    description:
      "1. Setup: Start in a plank position with hands slightly wider than your shoulders. Your body should form a straight line.\n2. Brace: Squeeze your core and glutes tightly.\n3. Lower: Slowly bend your elbows, tucking them back towards your body (45-degree angle), and lower your chest toward the floor.\n4. Depth: Go down until your chest is close to the floor.\n5. Press: Press forcefully through your hands to push your body back up until your arms are straight.",
    beginnerTips:
      "• Straight Line: Don't let your hips sag or pike up. Maintain a rigid plank posture.\n• Elbow Angle: Keep elbows tucked in, not flared out, to protect your shoulder joints.\n• Scaling: If standard push-ups are too difficult, place your hands on an elevated surface like a bench or box.",
    videoUrl: "https://www.youtube.com/watch?v=04FqT6lC0i4",
  },
  {
    id: "14",
    name: "Seated Cable Row",
    bodyPart: "Back",
    equipment: "Cable Machine",
    image: require("../../assets/images/ListScreen/14-cable-row.jpg"),
    description:
      "1. Setup: Sit at the cable machine with your feet braced. Grab the handle and sit up straight.\n2. Pull: Keeping your torso still, pull the handle toward your abdomen. Focus on pulling your elbows back.\n3. Squeeze: As the handle reaches your stomach, squeeze your shoulder blades together hard.\n4. Release: Slowly let your arms extend, allowing your back muscles to stretch forward slightly (but keeping your lower back straight).",
    beginnerTips:
      "• Avoid Swinging: Avoid swinging your body back and forth (minimal lean is okay, but don't rock).\n• Pull with Back: Think of your arms as hooks—use your back muscles (lats) to pull the weight, not your biceps.\n• Chest Out: Keep your chest up and your shoulders down throughout the movement.",
    videoUrl: "https://www.youtube.com/watch?v=f_r95UajQcg",
  },
  {
    id: "15",
    name: "Cable Crossover Fly",
    bodyPart: "Chest",
    equipment: "Cables",
    image: require("../../assets/images/ListScreen/15-cable-crossover.jpg"),
    description:
      "1. Setup: Stand centered between the high cable pulleys. Grab a handle in each hand. Take one step forward.\n2. Stance: Maintain a slight bend in your elbows and lean your torso forward slightly.\n3. Squeeze In: Bring your hands together in front of your chest in a wide arc. Feel your chest muscles contract.\n4. Cross: At the peak, your hands should cross slightly in front of your body.\n5. Stretch: Slowly let your arms open back up, controlling the weight as you feel a deep stretch across your chest.",
    beginnerTips:
      "• Fixed Elbows: The angle of your elbows should not change throughout the set.\n• Mind-Muscle Connection: This exercise is all about feeling the chest squeeze. Don't worry about lifting heavy.\n• Smooth Arc: Ensure your hands travel in a smooth, continuous arcing path, not straight down.",
    videoUrl: "https://www.youtube.com/watch?v=D9dh1jKBlXY",
  },
  {
    id: "16",
    name: "Bent-Over Barbell Row",
    bodyPart: "Back",
    equipment: "Barbell",
    image: require("../../assets/images/ListScreen/16-barbell-row.jpg"),
    description:
      "1. Setup: Hold a barbell with an overhand grip, hands just outside your knees. Hinge at your hips until your torso is nearly parallel to the floor (or at a 45-degree angle).\n2. Brace: Keep your core tight and your back straight (flat).\n3. Row: Pull the barbell up towards your belly button, driving your elbows back and squeezing your shoulder blades.\n4. Lower: Lower the barbell slowly and with control back to the extended position.",
    beginnerTips:
      "• Flat Back: Maintaining a perfectly straight (flat) back is critical. Never round your spine.\n• Hips Back: The exercise is performed by holding the hip hinge—don't let your torso raise up during the pull.\n• Elbow Drive: Focus on pulling with your elbows, which automatically engages the back muscles.",
    videoUrl: "https://www.youtube.com/watch?v=-xlBxIMqh3A",
  },
  {
    id: "17",
    name: "Standing Calf Raise",
    bodyPart: "Legs",
    equipment: "Machine",
    image: require("../../assets/images/ListScreen/17-calf-raise.jpg"),
    description:
      "1. Setup: Stand on a platform or step with the balls of your feet, letting your heels drop down for a stretch. Hold onto a stable object or use a machine for balance.\n2. Find Stretch: Go down as far as possible until you feel a deep stretch in your calves.\n3. Raise: Push through the balls of your feet to raise your heels as high as possible, contracting your calves forcefully at the top.\n4. Hold: Pause at the peak of the contraction for one second.\n5. Lower: Slowly lower your heels all the way down to complete the repetition.",
    beginnerTips:
      "• Full Range: Make sure you get a full stretch at the bottom and a full contraction at the top.\n• Slow Control: Avoid bouncing. The movement should be slow, controlled, and deliberate.\n• Knees Soft: Keep your knees straight but fixed throughout the set.",
    videoUrl: "https://www.youtube.com/watch?v=_iYwv4QVFjM",
  },
  {
    id: "18",
    name: "Hanging Leg Raise",
    bodyPart: "Core",
    equipment: "Pull-up Bar",
    image: require("../../assets/images/ListScreen/18-hanging-leg-raise.jpg"),
    description:
      "1. Setup: Hang from a pull-up bar with a comfortable grip. Keep your body steady and core engaged (prevent swinging).\n2. Raise: Using your lower abdominal muscles, slowly raise your knees up toward your chest.\n3. Peak: Bring your thighs parallel to the floor or as high as you comfortably can.\n4. Lower: Slowly lower your legs back to the starting position, maintaining control the entire time to prevent swinging.",
    beginnerTips:
      "• No Swing: If you start swinging, stop and rest. The movement must be controlled.\n• Progression: Beginners should start with a Hanging Knee Raise (just lifting the knees, not the entire leg).\n• Core Focus: Focus on tilting your pelvis up to engage the abs, rather than just using hip flexors.",
    videoUrl: "https://www.youtube.com/watch?v=Nw0LOKe3_l8",
  },
  {
    id: "19",
    name: "Dumbbell Fly (Flat Bench)",
    bodyPart: "Chest",
    equipment: "Dumbbells, Bench",
    image: require("../../assets/images/ListScreen/19-dumbbell-fly.jpg"),
    description:
      "1. Setup: Lie on a flat bench, holding a dumbbell in each hand above your chest, palms facing each other.\n2. Elbows: Lock a slight bend (like holding a ball) into your elbows—this bend should not change.\n3. Lower: Slowly lower the dumbbells out to the sides in a wide arc until you feel a comfortable stretch in your chest.\n4. Squeeze: Use your chest muscles to pull the dumbbells back up along the same wide arc to the starting position.\n5. Finish: Lightly touch the dumbbells at the top and repeat.",
    beginnerTips:
      "• Shoulder Safety: Never go lower than a comfortable position. Stop the moment you feel strain in your shoulder joint.\n• Weight: Use a much lighter weight than you would for a chest press. This is a stretch and isolation exercise.\n• Visualize: Imagine you are hugging a giant tree trunk.",
    videoUrl: "https://www.youtube.com/watch?v=_NuiU857O6Q",
  },
  {
    id: "20",
    name: "Dumbbell Shoulder Shrug",
    bodyPart: "Shoulders",
    equipment: "Dumbbells",
    image: require("../../assets/images/ListScreen/20-shoulder-shrug.jpg"),
    description:
      "1. Setup: Stand tall with a heavy dumbbell in each hand, arms hanging straight at your sides.\n2. Shrug: Exhale and pull your shoulders straight up toward your ears as high as possible. Do not roll them.\n3. Contract: Squeeze the upper back/shoulder muscles (traps) hard at the very top of the movement.\n4. Lower: Slowly lower your shoulders back down, allowing a full stretch at the bottom.",
    beginnerTips:
      "• Up and Down ONLY: The movement should be vertical—no forward, back, or rolling motions.\n• Grip: If your hands give out before your traps do, use wrist straps (when you progress to heavy weight).\n• Control: Control the weight on the way down; don't let it fall.",
    videoUrl: "https://www.youtube.com/watch?v=RLHxN6hq8NA",
  },
  {
    id: "21",
    name: "Incline Dumbbell Press",
    bodyPart: "Chest",
    equipment: "Dumbbells, Bench",
    image: require("../../assets/images/ListScreen/21-incline-dumbbell-press.jpg"),
    description:
      "1. Setup: Set the bench to a 30-45 degree angle. Sit with a dumbbell in each hand resting on your thighs.\n2. Position: Lie back and bring the dumbbells to shoulder level, palms facing forward.\n3. Press: Push the dumbbells up and slightly together until your arms are fully extended.\n4. Lower: Slowly lower the dumbbells back to the starting position with control.\n5. Repeat: Maintain tension in your chest throughout the movement.",
    beginnerTips:
      "• Angle Matters: Keep the bench at 30-45 degrees to target upper chest optimally.\n• Controlled Motion: Don't let the dumbbells drop quickly on the way down.\n• Shoulder Position: Keep your shoulders pulled back and down into the bench.",
    videoUrl: "https://www.youtube.com/watch?v=8iPEnn-ltC8",
  },
  {
    id: "22",
    name: "Dips",
    bodyPart: "Chest",
    equipment: "Dip Bars",
    image: require("../../assets/images/ListScreen/22-dips.jpg"),
    description:
      "1. Setup: Grab the parallel bars and jump up to support yourself with straight arms.\n2. Lean: Lean your torso slightly forward (about 30 degrees) to target the chest.\n3. Lower: Bend your elbows to lower your body until your shoulders are below your elbows.\n4. Press: Push yourself back up to the starting position by straightening your arms.\n5. Control: Maintain the forward lean throughout the entire movement.",
    beginnerTips:
      "• Forward Lean: Leaning forward targets chest; staying upright targets triceps more.\n• Shoulder Safety: Don't go too deep if you feel shoulder discomfort.\n• Assisted Option: Use resistance bands or an assisted dip machine if needed.",
    videoUrl: "https://www.youtube.com/watch?v=2z8JmcrW-As",
  },
  {
    id: "23",
    name: "Hammer Curl",
    bodyPart: "Biceps",
    equipment: "Dumbbells",
    image: require("../../assets/images/ListScreen/23-hammer-curl.jpg"),
    description:
      "1. Setup: Stand tall holding a dumbbell in each hand with palms facing your body (neutral grip).\n2. Curl: Keep your elbows pinned to your sides and curl the weights up toward your shoulders.\n3. Squeeze: Contract your biceps and forearms at the top of the movement.\n4. Lower: Slowly lower the weights back to the starting position with control.\n5. Form: Keep your upper arms stationary throughout the exercise.",
    beginnerTips:
      "• Neutral Grip: Palms should face each other throughout the entire movement.\n• Forearm Focus: This variation also works the brachialis and forearms.\n• No Swinging: Keep your body still and avoid using momentum.",
    videoUrl: "https://www.youtube.com/watch?v=zC3nLlEvin4",
  },
  {
    id: "24",
    name: "Barbell Curl",
    bodyPart: "Biceps",
    equipment: "Barbell",
    image: require("../../assets/images/ListScreen/24-barbell-curl.jpg"),
    description:
      "1. Setup: Stand with feet shoulder-width apart, holding a barbell with an underhand grip.\n2. Position: Start with arms fully extended, bar at thigh level.\n3. Curl: Curl the bar up toward your shoulders, keeping your elbows close to your body.\n4. Peak: Squeeze your biceps hard at the top.\n5. Lower: Slowly lower the bar back to the starting position.",
    beginnerTips:
      "• Fixed Elbows: Keep your elbows locked in position at your sides.\n• No Leaning: Don't lean back to lift the weight.\n• Full Range: Lower the bar all the way down for maximum muscle stretch.",
    videoUrl: "https://www.youtube.com/watch?v=kwG2ipFRgfo",
  },
  {
    id: "25",
    name: "Concentration Curl",
    bodyPart: "Biceps",
    equipment: "Dumbbell",
    image: require("../../assets/images/ListScreen/25-concentration-curl.jpg"),
    description:
      "1. Setup: Sit on a bench with legs spread, holding a dumbbell in one hand.\n2. Position: Rest your elbow against the inside of your thigh.\n3. Curl: Curl the weight up toward your shoulder, focusing on the bicep contraction.\n4. Squeeze: Pause at the top and squeeze your bicep hard.\n5. Lower: Slowly lower the weight back down with control.",
    beginnerTips:
      "• Isolation: This exercise is all about isolating the bicep muscle.\n• Mind-Muscle: Really focus on feeling your bicep working.\n• Stable Position: Keep your upper arm pressed firmly against your thigh.",
    videoUrl: "https://www.youtube.com/watch?v=Jvj2wV0zdn4",
  },
  {
    id: "26",
    name: "Preacher Curl",
    bodyPart: "Biceps",
    equipment: "Barbell, Preacher Bench",
    image: require("../../assets/images/ListScreen/26-preacher-curl.jpg"),
    description:
      "1. Setup: Sit at a preacher bench with your arms extended over the pad.\n2. Grip: Hold the barbell with an underhand grip, shoulder-width apart.\n3. Curl: Curl the bar toward your shoulders, keeping your upper arms flat on the pad.\n4. Contract: Squeeze your biceps at the top of the movement.\n5. Lower: Slowly extend your arms back to the starting position.",
    beginnerTips:
      "• Upper Arm Fixed: Keep your upper arms pressed flat against the pad.\n• No Momentum: The pad prevents cheating, so use proper weight.\n• Full Extension: Go all the way down but don't lock out completely.",
    videoUrl: "https://www.youtube.com/watch?v=fIWP-FRFNU0",
  },
  {
    id: "27",
    name: "Close-Grip Bench Press",
    bodyPart: "Triceps",
    equipment: "Barbell, Bench",
    image: require("../../assets/images/ListScreen/27-close-grip-bench.jpg"),
    description:
      "1. Setup: Lie on a flat bench and grip the bar with hands shoulder-width apart.\n2. Un-rack: Lift the bar off the rack and hold it above your chest.\n3. Lower: Lower the bar to your lower chest, keeping elbows close to your body.\n4. Press: Push the bar back up, focusing on contracting your triceps.\n5. Lockout: Fully extend your arms at the top.",
    beginnerTips:
      "• Narrow Grip: Hands should be closer than regular bench press but not too narrow.\n• Elbow Position: Keep elbows tucked in close to your sides.\n• Tricep Focus: This primarily works triceps, not chest.",
    videoUrl: "https://www.youtube.com/watch?v=nEF0bv2FW94",
  },
  {
    id: "28",
    name: "Tricep Dips",
    bodyPart: "Triceps",
    equipment: "Dip Bars or Bench",
    image: require("../../assets/images/ListScreen/28-tricep-dips.jpg"),
    description:
      "1. Setup: Grab parallel bars and support yourself with arms straight.\n2. Body Position: Keep your torso upright (don't lean forward like chest dips).\n3. Lower: Bend your elbows to lower your body until arms are at 90 degrees.\n4. Press: Push yourself back up by extending your elbows.\n5. Focus: Keep the movement controlled and focus on triceps.",
    beginnerTips:
      "• Upright Posture: Stay vertical to target triceps, not chest.\n• Elbow Position: Keep elbows pointing back, not flared out.\n• Range: Don't go too deep if it hurts your shoulders.",
    videoUrl: "https://www.youtube.com/watch?v=6kALZikXxLc",
  },
  {
    id: "29",
    name: "Cable Tricep Pushdown",
    bodyPart: "Triceps",
    equipment: "Cable Machine",
    image: require("../../assets/images/ListScreen/29-tricep-pushdown.jpg"),
    description:
      "1. Setup: Stand facing a cable machine with a rope or bar attachment at chest height.\n2. Grip: Grab the attachment with both hands, elbows at your sides.\n3. Push: Push the attachment down by extending your elbows until arms are straight.\n4. Squeeze: Contract your triceps hard at the bottom.\n5. Return: Slowly let the attachment come back up with control.",
    beginnerTips:
      "• Fixed Elbows: Keep your elbows pinned to your sides throughout.\n• Full Extension: Straighten your arms completely at the bottom.\n• Upper Arm Still: Only your forearms should move.",
    videoUrl: "https://www.youtube.com/watch?v=2-LAMcpzODU",
  },
  {
    id: "30",
    name: "Skull Crushers",
    bodyPart: "Triceps",
    equipment: "Barbell or Dumbbells",
    image: require("../../assets/images/ListScreen/30-skull-crushers.jpg"),
    description:
      "1. Setup: Lie on a flat bench holding a barbell with arms extended above your chest.\n2. Grip: Use a narrow, overhand grip on the bar.\n3. Lower: Bend only at the elbows to lower the bar toward your forehead.\n4. Stop: Stop when the bar is just above your forehead.\n5. Extend: Press the bar back up by straightening your arms.",
    beginnerTips:
      "• Elbow Position: Keep your elbows pointing toward the ceiling, not flared out.\n• Upper Arm Fixed: Only your forearms should move during the exercise.\n• Safety: Use a spotter or lighter weight when learning this movement.",
    videoUrl: "https://www.youtube.com/watch?v=d_KZxkY_0cM",
  },
  {
    id: "31",
    name: "Lat Pulldown",
    bodyPart: "Back",
    equipment: "Cable Machine",
    image: require("../../assets/images/ListScreen/31-lat-pulldown.jpg"),
    description:
      "1. Setup: Sit at a lat pulldown machine and grab the bar with a wide overhand grip.\n2. Position: Sit with thighs secured under the pads, arms fully extended overhead.\n3. Pull: Pull the bar down to your upper chest, leading with your elbows.\n4. Squeeze: Squeeze your shoulder blades together at the bottom.\n5. Return: Slowly let the bar go back up with control.",
    beginnerTips:
      "• Lean Back: Slight lean back is okay, but don't use momentum.\n• Wide Grip: Wider grip emphasizes the lats more.\n• Pull to Chest: Avoid pulling behind the neck as it can strain shoulders.",
    videoUrl: "https://www.youtube.com/watch?v=CAwf7n6Luuc",
  },
  {
    id: "32",
    name: "Single-Arm Dumbbell Row",
    bodyPart: "Back",
    equipment: "Dumbbell, Bench",
    image: require("../../assets/images/ListScreen/32-dumbbell-row.jpg"),
    description:
      "1. Setup: Place one knee and hand on a bench, other foot on the floor.\n2. Dumbbell: Hold a dumbbell in your free hand with arm extended.\n3. Row: Pull the dumbbell up toward your hip, driving your elbow back.\n4. Squeeze: Squeeze your back muscles at the top of the movement.\n5. Lower: Lower the dumbbell slowly back to the starting position.",
    beginnerTips:
      "• Back Flat: Keep your back straight and parallel to the ground.\n• Elbow Path: Pull your elbow straight back, not out to the side.\n• Rotation: Avoid rotating your torso; keep it stable.",
    videoUrl: "https://www.youtube.com/watch?v=XZr84NqQr6Y",
  },
  {
    id: "33",
    name: "Front Squat",
    bodyPart: "Legs",
    equipment: "Barbell, Rack",
    image: require("../../assets/images/ListScreen/33-front-squat.jpg"),
    description:
      "1. Setup: Place the bar across the front of your shoulders, elbows high.\n2. Grip: Cross your arms or use a clean grip to hold the bar.\n3. Stance: Stand with feet shoulder-width apart.\n4. Descend: Squat down keeping your chest up and elbows high.\n5. Drive: Push through your heels to stand back up.",
    beginnerTips:
      "• Elbows Up: Keep your elbows as high as possible throughout.\n• Upright Torso: This variation requires a more upright posture than back squats.\n• Quad Focus: Front squats emphasize the quadriceps more.",
    videoUrl: "https://www.youtube.com/watch?v=uYumuL_G_V0",
  },
  {
    id: "34",
    name: "Arnold Press",
    bodyPart: "Shoulders",
    equipment: "Dumbbells",
    image: require("../../assets/images/ListScreen/34-arnold-press.jpg"),
    description:
      "1. Setup: Sit on a bench with back support, holding dumbbells at shoulder level.\n2. Starting Position: Palms facing toward you, like the top of a curl.\n3. Press and Rotate: Press the dumbbells up while rotating your palms forward.\n4. Top Position: Finish with palms facing forward, arms extended overhead.\n5. Return: Reverse the motion on the way down.",
    beginnerTips:
      "• Smooth Rotation: The rotation should be smooth and continuous.\n• Full Range: This exercise works all three shoulder heads.\n• Lighter Weight: Use lighter weight than regular shoulder press initially.",
    videoUrl: "https://www.youtube.com/watch?v=6Z15_WdXmVw",
  },
  {
    id: "35",
    name: "Face Pulls",
    bodyPart: "Shoulders",
    equipment: "Cable Machine",
    image: require("../../assets/images/ListScreen/35-face-pulls.jpg"),
    description:
      "1. Setup: Set a cable machine to upper chest height with a rope attachment.\n2. Grip: Grab the rope with both hands, palms facing each other.\n3. Pull: Pull the rope toward your face, separating the ends of the rope.\n4. Position: Your hands should end up beside your ears, elbows high.\n5. Return: Slowly return to the starting position with control.",
    beginnerTips:
      "• High Elbows: Keep your elbows higher than your wrists.\n• Pull Apart: Actively pull the rope ends apart at your face.\n• Rear Delts: This exercise targets the often-neglected rear shoulders.",
    videoUrl: "https://www.youtube.com/watch?v=rep-qVOkqgk",
  },
  {
    id: "36",
    name: "Russian Twist",
    bodyPart: "Core",
    equipment: "None or Weight Plate",
    image: require("../../assets/images/ListScreen/36-russian-twist.jpg"),
    description:
      "1. Setup: Sit on the floor with knees bent, feet lifted slightly off the ground.\n2. Lean Back: Lean back slightly to engage your core, keeping back straight.\n3. Rotate: Twist your torso to the right, then to the left.\n4. Touch: Touch the ground beside you with each twist.\n5. Control: Keep the movement controlled and deliberate.",
    beginnerTips:
      "• Core Engaged: Keep your abs tight throughout the entire movement.\n• Feet Position: Beginners can keep feet on the ground for easier balance.\n• Add Weight: Hold a weight plate or dumbbell for added resistance.",
    videoUrl: "https://www.youtube.com/watch?v=wkD8rjkodUI",
  },
  {
    id: "37",
    name: "Mountain Climbers",
    bodyPart: "Core",
    equipment: "None",
    image: require("../../assets/images/ListScreen/37-mountain-climbers.jpg"),
    description:
      "1. Setup: Start in a push-up position with arms straight.\n2. Drive: Drive one knee toward your chest.\n3. Switch: Quickly switch legs, bringing the other knee forward.\n4. Pace: Continue alternating legs at a steady or fast pace.\n5. Form: Keep your core tight and hips level throughout.",
    beginnerTips:
      "• Plank Position: Maintain a strong plank; don't let hips sag or pike up.\n• Core Engaged: This is a core and cardio exercise combined.\n• Speed: Start slow to master form, then increase speed.",
    videoUrl: "https://www.youtube.com/watch?v=nmwgirgXLYM",
  },
  {
    id: "38",
    name: "Incline Barbell Bench Press",
    bodyPart: "Chest",
    equipment: "Barbell, Incline Bench",
    image: { uri: "https://img.youtube.com/vi/5kyLUGVq_pk/hqdefault.jpg" },
    description:
      "1. Setup: Set the bench to a 30-45 degree incline. Lie back and grip the bar slightly wider than shoulder-width.\n2. Un-rack: Take a deep breath and un-rack the bar, holding it directly over your upper chest.\n3. Lower: Slowly lower the bar to your upper chest, keeping your elbows at about a 45-degree angle from your body.\n4. Press: Drive the bar back up in a straight line until your arms are fully locked out.\n5. Repeat: Keep your shoulder blades pinned back and down into the bench throughout every rep.",
    beginnerTips:
      "• Keep the incline moderate (30-45 degrees) — too steep turns this into a shoulder press. \n• Lower the bar to your upper chest, not your neck. \n• Keep your feet flat on the floor for a stable base.",
    videoUrl: "https://www.youtube.com/watch?v=5kyLUGVq_pk",
  },
  {
    id: "39",
    name: "Decline Barbell Bench Press",
    bodyPart: "Chest",
    equipment: "Barbell, Decline Bench",
    image: { uri: "https://img.youtube.com/vi/FFyGwcLnDYc/hqdefault.jpg" },
    description:
      "1. Setup: Secure your feet under the footpads of a decline bench and lie back, gripping the bar slightly wider than shoulder-width.\n2. Un-rack: Take a deep breath and un-rack the bar, bringing it over your lower chest.\n3. Lower: Slowly lower the bar to your lower chest, keeping your elbows tucked at roughly 45 degrees.\n4. Press: Push the bar back up explosively until your arms are fully extended.\n5. Control: Move with control in both directions — this angle can strain your shoulders if you rush it.",
    beginnerTips:
      "• Have a spotter nearby; getting out of a decline bench with a loaded bar is trickier than a flat one. \n• Don't bounce the bar off your chest. \n• Use a lighter weight than your flat bench press until you're comfortable with the angle.",
    videoUrl: "https://www.youtube.com/watch?v=FFyGwcLnDYc",
  },
  {
    id: "40",
    name: "Flat Dumbbell Bench Press",
    bodyPart: "Chest",
    equipment: "Dumbbells, Bench",
    image: { uri: "https://img.youtube.com/vi/KRbyo0jj2ao/hqdefault.jpg" },
    description:
      "1. Setup: Lie on a flat bench holding a dumbbell in each hand at chest level, palms facing forward.\n2. Brace: Plant your feet firmly on the floor and squeeze your shoulder blades together.\n3. Press: Push both dumbbells straight up until your arms are extended, letting the dumbbells drift slightly together at the top.\n4. Lower: Slowly lower the dumbbells back down until you feel a stretch across your chest.\n5. Repeat: Keep your wrists stacked directly over your elbows throughout the movement.",
    beginnerTips:
      "• Dumbbells allow a deeper stretch than a barbell — don't drop lower than feels safe on your shoulders. \n• Keep the dumbbells under control; don't let them tip forward or backward. \n• Ask a spotter for help getting the dumbbells into position on your first few sessions with a heavy weight.",
    videoUrl: "https://www.youtube.com/watch?v=KRbyo0jj2ao",
  },
  {
    id: "41",
    name: "Pec Deck Machine Fly",
    bodyPart: "Chest",
    equipment: "Machine",
    image: { uri: "https://img.youtube.com/vi/10hg4LAa7UQ/hqdefault.jpg" },
    description:
      "1. Setup: Sit in the machine with your back flat against the pad and grab the handles (or place your forearms on the pads).\n2. Position: Your upper arms should be roughly parallel to the floor, elbows slightly bent.\n3. Squeeze: Bring your arms together in front of your chest, squeezing your chest muscles hard.\n4. Hold: Pause for a second at the point of full contraction.\n5. Return: Slowly let your arms open back out to the starting position, controlling the weight the whole way.",
    beginnerTips:
      "• Adjust the seat so the handles line up with your chest, not your shoulders or stomach. \n• Don't let the weight stack slam down between reps — control the negative. \n• Focus on squeezing your chest together rather than just moving your arms.",
    videoUrl: "https://www.youtube.com/watch?v=10hg4LAa7UQ",
  },
  {
    id: "42",
    name: "Incline Dumbbell Fly",
    bodyPart: "Chest",
    equipment: "Dumbbells, Incline Bench",
    image: { uri: "https://img.youtube.com/vi/Bk4-YooAZ50/hqdefault.jpg" },
    description:
      "1. Setup: Set the bench to a 30-45 degree incline. Lie back holding a dumbbell in each hand above your upper chest, palms facing each other.\n2. Elbows: Lock in a slight, fixed bend in your elbows.\n3. Lower: Open your arms out to the sides in a wide arc until you feel a stretch across your upper chest.\n4. Squeeze: Bring the dumbbells back together above your chest along the same arc, squeezing your chest at the top.\n5. Repeat: Keep the movement slow and controlled — this is not a heavy lift.",
    beginnerTips:
      "• Use lighter dumbbells than you think you need; the shoulder joint is vulnerable in this stretched position. \n• Stop the descent the moment you feel strain, not just stretch. \n• Keep your lower back flat against the bench rather than arching.",
    videoUrl: "https://www.youtube.com/watch?v=Bk4-YooAZ50",
  },
  {
    id: "43",
    name: "Chest Press Machine",
    bodyPart: "Chest",
    equipment: "Machine",
    image: { uri: "https://img.youtube.com/vi/sqNwDkUU_Ps/hqdefault.jpg" },
    description:
      "1. Setup: Adjust the seat so the handles sit at mid-chest height. Sit with your back flat against the pad.\n2. Grip: Grab the handles with a full grip, elbows bent behind you.\n3. Press: Push the handles forward until your arms are extended, without locking your elbows out hard.\n4. Squeeze: Contract your chest at full extension.\n5. Return: Slowly bring the handles back to the starting position, letting your chest stretch slightly.",
    beginnerTips:
      "• A great option for beginners to learn the pressing motion without needing to balance a free weight. \n• Keep your back and head against the pad throughout the set. \n• Don't slam the weight stack at the bottom of the rep.",
    videoUrl: "https://www.youtube.com/watch?v=sqNwDkUU_Ps",
  },
  {
    id: "44",
    name: "Smith Machine Bench Press",
    bodyPart: "Chest",
    equipment: "Smith Machine, Bench",
    image: { uri: "https://img.youtube.com/vi/7FyJdsXeta8/hqdefault.jpg" },
    description:
      "1. Setup: Position a flat bench under the bar so it lines up with your mid-chest. Lie down and grip the bar slightly wider than shoulder-width.\n2. Un-rack: Rotate your wrists to unhook the bar from the machine's safety catches.\n3. Lower: Slowly lower the bar to your chest, keeping your elbows at a 45-degree angle.\n4. Press: Push the bar back up along its fixed track until your arms are extended.\n5. Re-rack: Rotate your wrists again to lock the bar back onto the catches when you're finished.\n6. Note: The fixed bar path makes this a good option for training closer to failure safely.",
    beginnerTips:
      "• The bar moves in a straight vertical line, so position the bench carefully before you start. \n• Set the safety catches just below your chest in case you need to bail. \n• Because the machine handles stability, focus entirely on pressing power and control.",
    videoUrl: "https://www.youtube.com/watch?v=7FyJdsXeta8",
  },
  {
    id: "45",
    name: "Landmine Press",
    bodyPart: "Chest",
    equipment: "Barbell, Landmine Attachment",
    image: { uri: "https://img.youtube.com/vi/1G-_FTEkoNw/hqdefault.jpg" },
    description:
      "1. Setup: Wedge one end of a barbell into a landmine attachment (or a sturdy corner). Load the free end with weight.\n2. Grip: Hold the free end of the bar at shoulder height with one or both hands.\n3. Press: Push the bar up and away from your chest at an angle, extending your arm(s) fully.\n4. Lower: Slowly bring the bar back down to shoulder height with control.\n5. Repeat: Complete all reps on one side before switching, if pressing with a single arm.",
    beginnerTips:
      "• The angled path is easier on the shoulders than a straight overhead or bench press. \n• Keep your core braced, especially when pressing with one arm. \n• Stand with a staggered stance for extra stability on single-arm presses.",
    videoUrl: "https://www.youtube.com/watch?v=1G-_FTEkoNw",
  },
  {
    id: "46",
    name: "T-Bar Row",
    bodyPart: "Back",
    equipment: "T-Bar Row Machine or Barbell",
    image: { uri: "https://img.youtube.com/vi/SbZycT7Eq58/hqdefault.jpg" },
    description:
      "1. Setup: Straddle the T-bar with a barbell loaded in the landmine sleeve, or use a dedicated T-bar row machine.\n2. Hinge: Bend your knees slightly and hinge forward at the hips until your torso is close to parallel with the floor. Keep your back flat.\n3. Grip: Grab the handles with both hands, arms extended.\n4. Row: Pull the weight up toward your chest, driving your elbows back and squeezing your shoulder blades together.\n5. Lower: Slowly lower the weight back down under control until your arms are fully extended.",
    beginnerTips:
      "• Keep your back flat throughout — never let it round under load. \n• Pull with your elbows, not your hands, to keep the focus on your back muscles. \n• Start with a lighter weight until your hip hinge position feels stable.",
    videoUrl: "https://www.youtube.com/watch?v=SbZycT7Eq58",
  },
  {
    id: "47",
    name: "Reverse-Grip Lat Pulldown",
    bodyPart: "Back",
    equipment: "Cable Machine",
    image: { uri: "https://img.youtube.com/vi/D-aYXhHBDI8/hqdefault.jpg" },
    description:
      "1. Setup: Sit at a lat pulldown machine and grab the bar with an underhand (palms facing you) grip, hands shoulder-width apart.\n2. Position: Secure your thighs under the pads and sit up tall, arms fully extended overhead.\n3. Pull: Pull the bar down toward your upper chest, driving your elbows down and back.\n4. Squeeze: Squeeze your shoulder blades together and your lats hard at the bottom.\n5. Return: Slowly let the bar rise back up with control until your arms are straight.",
    beginnerTips:
      "• The underhand grip brings your biceps into the movement more than a wide overhand grip. \n• Avoid using momentum by leaning back excessively. \n• Keep your chest lifted and focus on pulling with your back, not just your arms.",
    videoUrl: "https://www.youtube.com/watch?v=D-aYXhHBDI8",
  },
  {
    id: "48",
    name: "Close-Grip Lat Pulldown",
    bodyPart: "Back",
    equipment: "Cable Machine",
    image: { uri: "https://img.youtube.com/vi/0rzMziYkK7k/hqdefault.jpg" },
    description:
      "1. Setup: Attach a close-grip (V-bar) handle to the lat pulldown cable. Sit down and secure your thighs under the pads.\n2. Grip: Grab the handle with both hands, palms facing each other.\n3. Pull: Pull the handle straight down toward your upper chest, keeping your elbows close to your body.\n4. Squeeze: Pause and squeeze your shoulder blades together at the bottom.\n5. Return: Slowly extend your arms back up to the starting position with control.",
    beginnerTips:
      "• The neutral grip is often more comfortable on the shoulders and wrists than a wide grip. \n• Keep your torso still — don't lean back to move more weight. \n• Focus on pulling your elbows down and back rather than just bending your arms.",
    videoUrl: "https://www.youtube.com/watch?v=0rzMziYkK7k",
  },
  {
    id: "49",
    name: "Back Extension (Hyperextension)",
    bodyPart: "Back",
    equipment: "Hyperextension Bench",
    image: { uri: "https://img.youtube.com/vi/qtjJUWCnDyE/hqdefault.jpg" },
    description:
      "1. Setup: Position yourself face-down on a hyperextension bench with your hips resting on the pad and ankles secured.\n2. Start: Cross your arms over your chest or place hands lightly behind your head. Lower your torso down until you feel a stretch in your hamstrings and lower back.\n3. Raise: Squeeze your glutes and lower back muscles to raise your torso until your body forms a straight line.\n4. Peak: Do not hyperextend past a straight line — avoid arching your back excessively at the top.\n5. Lower: Slowly lower back down to the stretched position with control.",
    beginnerTips:
      "• Move slowly and avoid snapping or jerking at the top of the movement. \n• Squeeze your glutes to help protect your lower back through the lift. \n• Start with just your bodyweight before adding a plate to your chest.",
    videoUrl: "https://www.youtube.com/watch?v=qtjJUWCnDyE",
  },
  {
    id: "50",
    name: "Straight-Arm Pulldown",
    bodyPart: "Back",
    equipment: "Cable Machine",
    image: { uri: "https://img.youtube.com/vi/soX7zhZ7yfQ/hqdefault.jpg" },
    description:
      "1. Setup: Stand facing a high cable pulley with a straight or rope attachment. Grab it with both hands, arms extended overhead.\n2. Stance: Take a small step back, hinge slightly forward at the hips, and keep a slight bend in your elbows.\n3. Pull: Keeping your arms straight, pull the bar down in an arc until it reaches your thighs.\n4. Squeeze: Squeeze your lats hard at the bottom of the movement.\n5. Return: Slowly let the bar rise back up along the same arc, feeling a stretch in your lats.",
    beginnerTips:
      "• Keep the slight bend in your elbows fixed throughout — don't turn this into a tricep pushdown. \n• Focus on using your lats to pull, not your shoulders. \n• Use a lighter weight than you'd expect; this is an isolation movement.",
    videoUrl: "https://www.youtube.com/watch?v=soX7zhZ7yfQ",
  },
  {
    id: "51",
    name: "Rack Pull",
    bodyPart: "Back, Legs",
    equipment: "Barbell, Rack",
    image: { uri: "https://img.youtube.com/vi/aAjN8zS7Idg/hqdefault.jpg" },
    description:
      "1. Setup: Set the safety pins in a power rack just below knee height and place a loaded barbell on them.\n2. Grip: Bend down and grip the bar just outside your shins, keeping your back flat.\n3. Brace: Take a deep breath, lift your chest, and pull the slack out of the bar.\n4. Lift: Drive through your heels and stand up tall, squeezing your glutes and upper back at the top.\n5. Lower: Reverse the motion with control and reset the bar on the pins between reps.",
    beginnerTips:
      "• The reduced range of motion means you can typically handle more weight than a full deadlift — increase load gradually. \n• Keep your back flat throughout; never round it to muscle the bar up. \n• Focus on squeezing your shoulder blades together at the top rather than leaning back.",
    videoUrl: "https://www.youtube.com/watch?v=aAjN8zS7Idg",
  },
  {
    id: "52",
    name: "Chin-Up",
    bodyPart: "Back, Biceps",
    equipment: "Pull-up Bar",
    image: { uri: "https://img.youtube.com/vi/brhRXlOhsAM/hqdefault.jpg" },
    description:
      "1. Grip: Grab the bar with an underhand grip (palms facing you), hands about shoulder-width apart.\n2. Hang: Start from a dead hang with your arms fully extended.\n3. Pull: Pull your body up by driving your elbows down toward your hips, leading with your chest.\n4. Peak: Continue until your chin clears the bar.\n5. Lower: Lower yourself slowly and fully back to a dead hang.",
    beginnerTips:
      "• The underhand grip recruits more biceps than a standard pull-up, which many beginners find easier. \n• Avoid kipping or swinging — keep the movement strict. \n• If you can't yet do a full rep, use a resistance band for assistance or focus on slow negatives.",
    videoUrl: "https://www.youtube.com/watch?v=brhRXlOhsAM",
  },
  {
    id: "53",
    name: "Inverted Row",
    bodyPart: "Back",
    equipment: "Barbell, Smith Machine or Rack",
    image: { uri: "https://img.youtube.com/vi/5W8F6MzZ8Rk/hqdefault.jpg" },
    description:
      "1. Setup: Set a bar in a rack or Smith machine at about waist height. Lie underneath it and grab the bar with an overhand grip, slightly wider than shoulder-width.\n2. Body Line: Walk your feet out until your body forms a straight line from head to heels, hanging below the bar.\n3. Row: Pull your chest up to the bar by driving your elbows back and squeezing your shoulder blades together.\n4. Squeeze: Pause and hold the top position briefly.\n5. Lower: Lower yourself back down with control until your arms are fully extended.",
    beginnerTips:
      "• Make it easier by walking your feet closer to your body (more upright angle) or harder by walking them further out. \n• Keep your hips up — don't let them sag toward the floor. \n• This is a great bodyweight alternative to build rowing strength before loading a barbell.",
    videoUrl: "https://www.youtube.com/watch?v=5W8F6MzZ8Rk",
  },
  {
    id: "54",
    name: "Chest-Supported Row",
    bodyPart: "Back",
    equipment: "Machine or Dumbbells, Incline Bench",
    image: { uri: "https://img.youtube.com/vi/h5PMTMiuhZA/hqdefault.jpg" },
    description:
      "1. Setup: Lie face-down on an incline bench (or sit at a chest-supported row machine) holding a dumbbell in each hand, arms extended toward the floor.\n2. Brace: Keep your chest pressed firmly against the pad throughout the set.\n3. Row: Pull the weights up toward your hips, driving your elbows back and squeezing your shoulder blades together.\n4. Squeeze: Pause briefly at the top of the movement.\n5. Lower: Slowly lower the weights back down until your arms are fully extended.",
    beginnerTips:
      "• Because your chest is supported, you can't cheat with momentum — focus purely on your back muscles. \n• Keep your neck relaxed and in a neutral position; don't crane it up. \n• This variation is a great option if you have any lower-back sensitivity with bent-over rows.",
    videoUrl: "https://www.youtube.com/watch?v=h5PMTMiuhZA",
  },
  {
    id: "55",
    name: "Cable Lateral Raise",
    bodyPart: "Shoulders",
    equipment: "Cable Machine",
    image: { uri: "https://img.youtube.com/vi/qitQHqNZbeM/hqdefault.jpg" },
    description:
      "1. Setup: Stand sideways next to a low cable pulley. Grab the handle with the hand farthest from the machine, across your body.\n2. Stance: Stand tall with a slight bend in your elbow.\n3. Raise: Lift your arm out to the side until it reaches shoulder height, leading with your elbow.\n4. Peak: Pause briefly at the top, keeping your pinky slightly higher than your thumb.\n5. Lower: Slowly lower the handle back down across your body with control.\n6. Switch: Complete all reps, then turn around to work the other side.",
    beginnerTips:
      "• The cable keeps constant tension on your shoulder throughout the whole range, unlike a dumbbell. \n• Use a light weight and avoid shrugging your shoulder up toward your ear. \n• Keep your torso still — don't lean away from the machine to lift the weight.",
    videoUrl: "https://www.youtube.com/watch?v=qitQHqNZbeM",
  },
  {
    id: "56",
    name: "Dumbbell Front Raise",
    bodyPart: "Shoulders",
    equipment: "Dumbbells",
    image: { uri: "https://img.youtube.com/vi/fKMIHZD9S98/hqdefault.jpg" },
    description:
      "1. Setup: Stand tall holding a dumbbell in each hand in front of your thighs, palms facing your body.\n2. Raise: Keeping a slight bend in your elbows, lift one or both dumbbells straight up in front of you to shoulder height.\n3. Peak: Pause briefly at the top without shrugging your shoulders up.\n4. Lower: Slowly lower the dumbbells back down to the starting position.\n5. Repeat: Alternate arms or raise both together, keeping the pace controlled.",
    beginnerTips:
      "• Use a lighter weight than you'd use for a lateral raise — this is a smaller, more isolated movement. \n• Avoid swinging the weight up using your lower back or momentum. \n• Stop at shoulder height; going higher shifts the work onto your traps.",
    videoUrl: "https://www.youtube.com/watch?v=fKMIHZD9S98",
  },
  {
    id: "57",
    name: "Dumbbell Rear Delt Fly",
    bodyPart: "Shoulders",
    equipment: "Dumbbells, Bench",
    image: { uri: "https://img.youtube.com/vi/buuYPLVXsJg/hqdefault.jpg" },
    description:
      "1. Setup: Sit on the edge of a bench and hinge forward at the hips until your chest is close to your thighs. Hold a dumbbell in each hand, arms hanging down.\n2. Elbows: Keep a slight, fixed bend in your elbows.\n3. Raise: Lift both dumbbells out to the sides in a wide arc, squeezing your shoulder blades together.\n4. Peak: Pause when your arms reach shoulder height.\n5. Lower: Slowly lower the dumbbells back down to the starting position.",
    beginnerTips:
      "• Use light weight — the rear delts are a small muscle group and easy to overload with momentum. \n• Focus on squeezing your shoulder blades together, not just lifting your arms. \n• Keep your torso still; don't rock your body to help lift the weight.",
    videoUrl: "https://www.youtube.com/watch?v=buuYPLVXsJg",
  },
  {
    id: "58",
    name: "Barbell Upright Row",
    bodyPart: "Shoulders",
    equipment: "Barbell",
    image: { uri: "https://img.youtube.com/vi/um3VVzqunPU/hqdefault.jpg" },
    description:
      "1. Setup: Stand tall holding a barbell in front of your thighs with an overhand grip, hands shoulder-width apart.\n2. Pull: Pull the bar straight up along your body, leading with your elbows.\n3. Peak: Raise the bar to about chest height, keeping your elbows higher than your forearms.\n4. Pause: Briefly hold the top position, feeling the contraction in your shoulders and traps.\n5. Lower: Slowly lower the bar back down to the starting position.",
    beginnerTips:
      "• Stop raising the bar around chest height — going higher can strain your shoulder joints. \n• If you feel any shoulder pinching, try a wider grip on the bar. \n• Keep the bar close to your body throughout the movement.",
    videoUrl: "https://www.youtube.com/watch?v=um3VVzqunPU",
  },
  {
    id: "59",
    name: "Barbell Shrug",
    bodyPart: "Shoulders",
    equipment: "Barbell",
    image: { uri: "https://img.youtube.com/vi/N4yZkOfeoao/hqdefault.jpg" },
    description:
      "1. Setup: Stand tall holding a barbell in front of your thighs with an overhand grip, arms fully extended.\n2. Shrug: Pull your shoulders straight up toward your ears as high as you can, without rolling them.\n3. Squeeze: Hold and squeeze your traps hard at the very top.\n4. Lower: Slowly lower your shoulders back down, allowing a full stretch at the bottom.\n5. Repeat: Keep your arms straight throughout — all the movement happens at your shoulders.",
    beginnerTips:
      "• Move straight up and down; avoid rolling your shoulders forward or backward. \n• Use a mixed or hook grip if the bar starts slipping out of your hands before your traps are tired. \n• Control the weight down instead of letting gravity drop it.",
    videoUrl: "https://www.youtube.com/watch?v=N4yZkOfeoao",
  },
  {
    id: "60",
    name: "Machine Shoulder Press",
    bodyPart: "Shoulders",
    equipment: "Machine",
    image: { uri: "https://img.youtube.com/vi/3R14MnZbcpw/hqdefault.jpg" },
    description:
      "1. Setup: Adjust the seat so the handles line up with your shoulders. Sit with your back flat against the pad.\n2. Grip: Grab the handles with both hands, palms facing forward.\n3. Press: Push the handles straight up until your arms are extended, without locking your elbows out hard.\n4. Squeeze: Briefly hold the top position.\n5. Lower: Slowly lower the handles back down to shoulder level with control.",
    beginnerTips:
      "• A great option for learning overhead pressing without needing to stabilize free weights. \n• Keep your back flat against the pad — don't arch to help push the weight. \n• Adjust the seat height so the movement feels natural at the bottom position.",
    videoUrl: "https://www.youtube.com/watch?v=3R14MnZbcpw",
  },
  {
    id: "61",
    name: "Seated Dumbbell Shoulder Press",
    bodyPart: "Shoulders",
    equipment: "Dumbbells, Bench",
    image: { uri: "https://img.youtube.com/vi/HzIiNhHhhtA/hqdefault.jpg" },
    description:
      "1. Setup: Sit on a bench with back support, holding a dumbbell in each hand at shoulder height, palms facing forward.\n2. Brace: Squeeze your core to keep your torso stable.\n3. Press: Push both dumbbells straight up until your arms are extended, letting them drift slightly together at the top.\n4. Lower: Slowly lower the dumbbells back down to shoulder height with control.\n5. Repeat: Keep your wrists stacked directly above your elbows throughout.",
    beginnerTips:
      "• Don't arch your lower back to help press the weight up — keep it flat against the bench. \n• Start with lighter dumbbells to groove the pressing pattern before going heavy. \n• Lower the dumbbells only to shoulder height, not further, to protect your shoulder joints.",
    videoUrl: "https://www.youtube.com/watch?v=HzIiNhHhhtA",
  },
  {
    id: "62",
    name: "Reverse Pec Deck Fly",
    bodyPart: "Shoulders",
    equipment: "Machine",
    image: { uri: "https://img.youtube.com/vi/E4Q12zRDwwU/hqdefault.jpg" },
    description:
      "1. Setup: Sit facing into a pec deck machine and grab the handles with your chest against the pad.\n2. Position: Your arms should be extended in front of you with a slight bend in the elbows.\n3. Squeeze: Pull your arms back and out to the sides, squeezing your rear shoulders and upper back together.\n4. Peak: Pause briefly at full contraction.\n5. Return: Slowly let your arms come back to the starting position, controlling the weight.",
    beginnerTips:
      "• Keep your chest pressed against the pad throughout the set. \n• Use a lighter weight than you would for the standard (forward) pec deck fly. \n• Focus on pulling with your rear shoulders, not just your arms.",
    videoUrl: "https://www.youtube.com/watch?v=E4Q12zRDwwU",
  },
  {
    id: "63",
    name: "Push Press",
    bodyPart: "Shoulders",
    equipment: "Barbell",
    image: { uri: "https://img.youtube.com/vi/X6-DMh-t4nQ/hqdefault.jpg" },
    description:
      "1. Setup: Hold a barbell at your upper chest, hands slightly wider than shoulder-width, feet hip-width apart.\n2. Dip: Bend your knees slightly in a short, quick dip while keeping your torso upright.\n3. Drive: Explosively extend your knees and hips to drive the bar upward off your chest.\n4. Press: Finish by pressing the bar to full lockout overhead using your shoulders.\n5. Lower: Lower the bar back to your chest with control, absorbing it with a slight knee bend.",
    beginnerTips:
      "• The leg drive is a short dip-and-drive, not a full squat — keep it quick and shallow. \n• Practice the strict overhead press first so your shoulders are ready for the added load. \n• Keep your core tight throughout to protect your lower back.",
    videoUrl: "https://www.youtube.com/watch?v=X6-DMh-t4nQ",
  },
  {
    id: "64",
    name: "Cable Curl",
    bodyPart: "Biceps",
    equipment: "Cable Machine",
    image: { uri: "https://img.youtube.com/vi/16aEi1a68E0/hqdefault.jpg" },
    description:
      "1. Setup: Attach a straight or EZ bar to a low cable pulley. Stand facing the machine and grab the bar with an underhand grip.\n2. Stance: Stand tall with your elbows pinned to your sides.\n3. Curl: Curl the bar up toward your shoulders, keeping your upper arms still.\n4. Squeeze: Pause and squeeze your biceps hard at the top.\n5. Lower: Slowly lower the bar back down until your arms are fully extended.",
    beginnerTips:
      "• The cable keeps tension on your biceps throughout the entire rep, unlike a dumbbell or barbell. \n• Keep your elbows fixed at your sides — don't let them drift forward. \n• Avoid leaning back to help move the weight.",
    videoUrl: "https://www.youtube.com/watch?v=16aEi1a68E0",
  },
  {
    id: "65",
    name: "EZ-Bar Curl",
    bodyPart: "Biceps",
    equipment: "EZ Curl Bar",
    image: { uri: "https://img.youtube.com/vi/5NsFLGUf0Fo/hqdefault.jpg" },
    description:
      "1. Setup: Stand tall holding an EZ curl bar with an underhand grip on the angled sections of the bar.\n2. Position: Keep your elbows pinned to your sides, arms fully extended.\n3. Curl: Curl the bar up toward your shoulders, squeezing your biceps.\n4. Peak: Pause briefly at the top of the movement.\n5. Lower: Slowly lower the bar back down to full extension.",
    beginnerTips:
      "• The angled grip of an EZ bar is often easier on the wrists than a straight barbell. \n• Keep your elbows still throughout — they shouldn't travel forward or back. \n• Avoid using momentum from your hips or lower back to swing the bar up.",
    videoUrl: "https://www.youtube.com/watch?v=5NsFLGUf0Fo",
  },
  {
    id: "66",
    name: "Incline Dumbbell Curl",
    bodyPart: "Biceps",
    equipment: "Dumbbells, Incline Bench",
    image: { uri: "https://img.youtube.com/vi/DCe8f6vMe9A/hqdefault.jpg" },
    description:
      "1. Setup: Sit back on an incline bench set to about 45-60 degrees, holding a dumbbell in each hand, arms hanging straight down.\n2. Position: Let your arms hang behind your torso slightly, which increases the stretch on your biceps.\n3. Curl: Curl the dumbbells up toward your shoulders, keeping your upper arms still.\n4. Squeeze: Pause and squeeze your biceps at the top.\n5. Lower: Slowly lower the dumbbells back down to a full stretch.",
    beginnerTips:
      "• The incline position increases the stretch on your biceps, so use a lighter weight than a standing curl. \n• Keep your shoulders pinned back against the bench throughout. \n• Avoid letting your elbows drift forward as you curl.",
    videoUrl: "https://www.youtube.com/watch?v=DCe8f6vMe9A",
  },
  {
    id: "67",
    name: "Cable Rope Hammer Curl",
    bodyPart: "Biceps",
    equipment: "Cable Machine",
    image: { uri: "https://img.youtube.com/vi/1Quc_tOv97I/hqdefault.jpg" },
    description:
      "1. Setup: Attach a rope handle to a low cable pulley. Stand facing the machine and grab both ends of the rope with a neutral (palms facing each other) grip.\n2. Stance: Keep your elbows pinned to your sides.\n3. Curl: Curl the rope up toward your shoulders, keeping your palms facing each other throughout.\n4. Squeeze: Pause and squeeze at the top of the movement.\n5. Lower: Slowly lower the rope back down to full arm extension.",
    beginnerTips:
      "• The neutral grip emphasizes your forearms and brachialis along with your biceps. \n• Keep your upper arms completely still throughout the set. \n• Don't let the weight stack slam down between reps.",
    videoUrl: "https://www.youtube.com/watch?v=1Quc_tOv97I",
  },
  {
    id: "68",
    name: "Reverse-Grip Barbell Curl",
    bodyPart: "Biceps",
    equipment: "Barbell",
    image: { uri: "https://img.youtube.com/vi/SQOsKWSHTMo/hqdefault.jpg" },
    description:
      "1. Setup: Stand tall holding a barbell with an overhand (palms down) grip, hands shoulder-width apart.\n2. Position: Keep your elbows pinned to your sides, arms fully extended.\n3. Curl: Curl the bar up toward your shoulders, keeping your wrists straight.\n4. Peak: Pause briefly at the top of the movement.\n5. Lower: Slowly lower the bar back down to the starting position.",
    beginnerTips:
      "• Use a lighter weight than your regular barbell curl — the overhand grip is more challenging on your forearms. \n• Keep your wrists straight and firm throughout; don't let them bend backward. \n• This variation builds forearm and grip strength alongside your biceps.",
    videoUrl: "https://www.youtube.com/watch?v=SQOsKWSHTMo",
  },
  {
    id: "69",
    name: "Zottman Curl",
    bodyPart: "Biceps",
    equipment: "Dumbbells",
    image: { uri: "https://img.youtube.com/vi/ZrpRBgswtHs/hqdefault.jpg" },
    description:
      "1. Setup: Stand tall holding a dumbbell in each hand at your sides, palms facing forward.\n2. Curl: Curl the dumbbells up toward your shoulders as you would a standard curl.\n3. Rotate: At the top, rotate your wrists so your palms face downward (overhand grip).\n4. Lower: Slowly lower the dumbbells back down in this overhand position.\n5. Reset: Once at the bottom, rotate your palms back to face forward and repeat.",
    beginnerTips:
      "• The slow, overhand lowering phase is what builds forearm strength — don't rush it. \n• Use a lighter weight than a standard curl since this variation is more demanding. \n• Keep your elbows fixed at your sides throughout the entire movement.",
    videoUrl: "https://www.youtube.com/watch?v=ZrpRBgswtHs",
  },
  {
    id: "70",
    name: "Spider Curl",
    bodyPart: "Biceps",
    equipment: "EZ Bar or Dumbbells, Preacher Bench",
    image: { uri: "https://img.youtube.com/vi/CITtSuda0Fg/hqdefault.jpg" },
    description:
      "1. Setup: Lie face-down on an inclined preacher bench (or the back of an incline bench), letting your arms hang straight down in front of you.\n2. Grip: Hold an EZ bar or dumbbells with an underhand grip, arms fully extended.\n3. Curl: Curl the weight up toward your shoulders, keeping your upper arms pressed against the pad.\n4. Squeeze: Pause and squeeze your biceps hard at the top.\n5. Lower: Slowly lower the weight back down to a full stretch.",
    beginnerTips:
      "• Because your upper arms are supported, you can't use momentum — focus on strict, controlled reps. \n• This position increases the stretch on your biceps, so use a moderate weight. \n• Keep your head relaxed and let your arms hang freely between reps.",
    videoUrl: "https://www.youtube.com/watch?v=CITtSuda0Fg",
  },
  {
    id: "71",
    name: "Cable Tricep Kickback",
    bodyPart: "Triceps",
    equipment: "Cable Machine",
    image: { uri: "https://img.youtube.com/vi/c8_a-jjTrOo/hqdefault.jpg" },
    description:
      "1. Setup: Attach a handle to a low cable pulley. Stand facing the machine and hinge forward at the hips, keeping your back flat.\n2. Position: Hold the handle with your upper arm parallel to the floor and your elbow bent at 90 degrees.\n3. Extend: Keeping your upper arm still, extend your forearm back until your arm is fully straight.\n4. Squeeze: Squeeze your tricep hard at full extension.\n5. Return: Slowly bend your elbow to bring the handle back to the starting position.",
    beginnerTips:
      "• Keep your upper arm pinned in place throughout — only your forearm should move. \n• Use a light weight; this is an isolation exercise, not a strength lift. \n• Keep your back flat and core braced rather than rounding forward.",
    videoUrl: "https://www.youtube.com/watch?v=c8_a-jjTrOo",
  },
  {
    id: "72",
    name: "Overhead Cable Tricep Extension",
    bodyPart: "Triceps",
    equipment: "Cable Machine, Rope Attachment",
    image: { uri: "https://img.youtube.com/vi/kqidUIf1eJE/hqdefault.jpg" },
    description:
      "1. Setup: Attach a rope to a low cable pulley. Face away from the machine and grab the rope with both hands, bringing it overhead.\n2. Stance: Take a small step forward with one foot for stability and lean your torso slightly forward.\n3. Extend: Keeping your upper arms still and close to your head, extend your forearms forward until your arms are straight.\n4. Squeeze: Squeeze your triceps hard at full extension.\n5. Return: Slowly bend your elbows to lower the rope back behind your head with control.",
    beginnerTips:
      "• Keep your elbows pointed forward and close to your head throughout the set. \n• Avoid letting your upper arms drift forward as you extend. \n• Use a lighter weight than pushdown variations since your triceps are more stretched at the start.",
    videoUrl: "https://www.youtube.com/watch?v=kqidUIf1eJE",
  },
  {
    id: "73",
    name: "Diamond Push-Up",
    bodyPart: "Triceps",
    equipment: "None",
    image: { uri: "https://img.youtube.com/vi/J0DnG1_S92I/hqdefault.jpg" },
    description:
      "1. Setup: Get into a push-up position and bring your hands together under your chest, forming a diamond shape with your thumbs and index fingers.\n2. Body Line: Keep your body in a straight line from head to heels.\n3. Lower: Bend your elbows to lower your chest toward your hands, keeping your elbows close to your body.\n4. Press: Push through your hands to press yourself back up until your arms are straight.\n5. Repeat: Keep your core and glutes braced throughout to prevent your hips from sagging.",
    beginnerTips:
      "• This variation is harder than a standard push-up — do them from your knees at first if needed. \n• Keep your elbows tucked close to your ribs rather than flaring them out. \n• Focus on squeezing your triceps at the top of every rep.",
    videoUrl: "https://www.youtube.com/watch?v=J0DnG1_S92I",
  },
  {
    id: "74",
    name: "Dumbbell Tricep Kickback",
    bodyPart: "Triceps",
    equipment: "Dumbbell, Bench",
    image: { uri: "https://img.youtube.com/vi/6SS6K3lAwZ8/hqdefault.jpg" },
    description:
      "1. Setup: Place one knee and hand on a bench, holding a dumbbell in your free hand.\n2. Position: Keep your upper arm parallel to the floor, elbow bent at 90 degrees, close to your body.\n3. Extend: Keeping your upper arm still, extend your forearm back until your arm is fully straight.\n4. Squeeze: Squeeze your tricep hard at the top.\n5. Return: Slowly bend your elbow to lower the dumbbell back to the starting position.",
    beginnerTips:
      "• Use a light dumbbell — it's easy to cheat this movement with momentum. \n• Keep your upper arm fixed and parallel to the floor throughout. \n• Keep your back flat and avoid rotating your torso as you extend.",
    videoUrl: "https://www.youtube.com/watch?v=6SS6K3lAwZ8",
  },
  {
    id: "75",
    name: "Single-Arm Dumbbell Overhead Extension",
    bodyPart: "Triceps",
    equipment: "Dumbbell",
    image: { uri: "https://img.youtube.com/vi/jTQWYdWLvys/hqdefault.jpg" },
    description:
      "1. Setup: Sit or stand holding a dumbbell in one hand, pressing it overhead until your arm is fully extended.\n2. Support: Use your free hand to support your working elbow, keeping it pointed toward the ceiling.\n3. Lower: Slowly bend your elbow to lower the dumbbell behind your head.\n4. Stretch: Lower until you feel a deep stretch in your tricep.\n5. Extend: Press the dumbbell back up to full extension using only your tricep.",
    beginnerTips:
      "• Keep your elbow pointed at the ceiling throughout — don't let it flare out to the side. \n• Brace your core to avoid arching your lower back. \n• Start with a light weight since balance and control take practice on this single-arm variation.",
    videoUrl: "https://www.youtube.com/watch?v=jTQWYdWLvys",
  },
  {
    id: "76",
    name: "Machine Tricep Extension",
    bodyPart: "Triceps",
    equipment: "Machine",
    image: { uri: "https://img.youtube.com/vi/j4XSuFLiZ6I/hqdefault.jpg" },
    description:
      "1. Setup: Sit in the machine and adjust the seat so your upper arms rest along the pads.\n2. Grip: Grab the handles with your elbows bent at roughly 90 degrees.\n3. Extend: Push the handles down (or forward, depending on the machine) until your arms are fully straight.\n4. Squeeze: Squeeze your triceps hard at full extension.\n5. Return: Slowly let the handles return to the starting position with control.",
    beginnerTips:
      "• Adjust the seat so your shoulders stay still throughout the movement. \n• Keep your upper arms pressed against the pads the entire set. \n• Avoid using your shoulders to help push — let your triceps do the work.",
    videoUrl: "https://www.youtube.com/watch?v=j4XSuFLiZ6I",
  },
  {
    id: "77",
    name: "JM Press",
    bodyPart: "Triceps",
    equipment: "Barbell, Bench",
    image: { uri: "https://img.youtube.com/vi/09q-wob818M/hqdefault.jpg" },
    description:
      "1. Setup: Lie on a flat bench holding a barbell with a grip slightly narrower than shoulder-width, arms extended above your chest.\n2. Lower: Bend your elbows and lower the bar toward your upper chest/chin area, similar to a skull crusher but at a slight angle.\n3. Blend: Allow your elbows to travel slightly forward as the bar descends, blending a close-grip press with a skull crusher.\n4. Press: Drive the bar back up using your triceps until your arms are fully extended.\n5. Control: Keep the movement slow and controlled throughout — this is an advanced hybrid movement.",
    beginnerTips:
      "• Start with a very light weight until you understand the elbow path — it's a hybrid movement that takes practice. \n• Keep your elbows tucked rather than flared out to the sides. \n• Consider mastering the skull crusher and close-grip bench press before adding this to your routine.",
    videoUrl: "https://www.youtube.com/watch?v=09q-wob818M",
  },
  {
    id: "78",
    name: "Romanian Deadlift",
    bodyPart: "Legs",
    equipment: "Barbell",
    image: { uri: "https://img.youtube.com/vi/uhghy9pFIPY/hqdefault.jpg" },
    description:
      "1. Setup: Stand tall holding a barbell in front of your thighs with an overhand grip, feet hip-width apart.\n2. Hinge: Push your hips straight back while keeping a soft bend in your knees and your back flat.\n3. Lower: Lower the bar down your legs, keeping it close to your body, until you feel a deep stretch in your hamstrings.\n4. Depth: Stop once your back starts to round or you reach around mid-shin, whichever comes first.\n5. Drive: Drive your hips forward to stand back up, squeezing your glutes and hamstrings at the top.",
    beginnerTips:
      "• This is a hip-hinge movement, not a squat — your knees should barely bend. \n• Keep the bar sliding close along your legs throughout. \n• Never round your lower back to chase a deeper stretch — depth comes from hamstring flexibility, not effort.",
    videoUrl: "https://www.youtube.com/watch?v=uhghy9pFIPY",
  },
  {
    id: "79",
    name: "Bulgarian Split Squat",
    bodyPart: "Legs",
    equipment: "Dumbbells, Bench",
    image: { uri: "https://img.youtube.com/vi/yewlXtRs3K4/hqdefault.jpg" },
    description:
      "1. Setup: Stand a couple of feet in front of a bench, holding a dumbbell in each hand. Place the top of one foot on the bench behind you.\n2. Stance: Your front foot should be far enough forward that your knee stays over your ankle at the bottom.\n3. Descend: Lower your body straight down by bending your front knee until your back knee nearly touches the floor.\n4. Drive: Push through your front heel to stand back up.\n5. Repeat: Complete all reps on one leg before switching sides.",
    beginnerTips:
      "• Expect a big balance challenge at first — practice without weight until you feel stable. \n• Keep most of your weight on your front leg; the back leg is just for balance. \n• Keep your torso upright and core braced throughout.",
    videoUrl: "https://www.youtube.com/watch?v=yewlXtRs3K4",
  },
  {
    id: "80",
    name: "Hip Thrust",
    bodyPart: "Legs",
    equipment: "Barbell, Bench",
    image: { uri: "https://img.youtube.com/vi/xDmFkJxPzeM/hqdefault.jpg" },
    description:
      "1. Setup: Sit on the floor with your upper back resting against a bench. Roll a padded barbell over your hips.\n2. Position: Bend your knees with feet flat on the floor, shoulder-width apart.\n3. Drive: Push through your heels and drive your hips up toward the ceiling, squeezing your glutes hard at the top.\n4. Peak: Your body should form a straight line from your shoulders to your knees at the top.\n5. Lower: Slowly lower your hips back down toward the floor without fully resting between reps.",
    beginnerTips:
      "• Use a barbell pad — the bar can dig uncomfortably into your hips without one. \n• Keep your chin tucked and avoid overextending your neck at the top. \n• Focus on squeezing your glutes, not just pushing the bar up.",
    videoUrl: "https://www.youtube.com/watch?v=xDmFkJxPzeM",
  },
  {
    id: "81",
    name: "Walking Lunge",
    bodyPart: "Legs",
    equipment: "Dumbbells",
    image: { uri: "https://img.youtube.com/vi/BenhAbJiTsw/hqdefault.jpg" },
    description:
      "1. Setup: Stand tall holding a dumbbell in each hand at your sides.\n2. Step: Take a long step forward with one leg, lowering your hips until both knees are bent around 90 degrees.\n3. Depth: Your back knee should hover just above the floor.\n4. Drive: Push off your front foot to bring your back leg through into the next step forward, rather than returning to the start.\n5. Continue: Keep alternating legs as you move forward for the full set.",
    beginnerTips:
      "• Take a moment to find your balance between each step rather than rushing forward. \n• Keep your torso upright and your core braced throughout. \n• Start with just your bodyweight to master the walking rhythm before adding dumbbells.",
    videoUrl: "https://www.youtube.com/watch?v=BenhAbJiTsw",
  },
  {
    id: "82",
    name: "Leg Extension (Machine)",
    bodyPart: "Legs",
    equipment: "Machine",
    image: { uri: "https://img.youtube.com/vi/tTbJBUKnWU8/hqdefault.jpg" },
    description:
      "1. Setup: Sit in the machine with your back against the pad and the ankle pad resting just above your feet.\n2. Grip: Hold the side handles for stability.\n3. Extend: Extend your legs to lift the pad up until your legs are straight, squeezing your quads hard at the top.\n4. Pause: Hold the contraction briefly at the top.\n5. Lower: Slowly lower the pad back down until your knees are bent at about 90 degrees.",
    beginnerTips:
      "• Adjust the ankle pad so it rests on your shins, not on top of your feet. \n• Avoid swinging or using momentum to lift the weight. \n• Control the descent — the lowering phase is just as important as the lift.",
    videoUrl: "https://www.youtube.com/watch?v=tTbJBUKnWU8",
  },
  {
    id: "83",
    name: "Lying Leg Curl (Machine)",
    bodyPart: "Legs",
    equipment: "Machine",
    image: { uri: "https://img.youtube.com/vi/d8VJCaT5qoI/hqdefault.jpg" },
    description:
      "1. Setup: Lie face-down on the machine with the ankle pad resting just above your heels.\n2. Grip: Hold the handles for stability and keep your hips pressed flat against the bench.\n3. Curl: Curl your heels up toward your glutes, squeezing your hamstrings hard.\n4. Pause: Hold the contraction briefly at the top.\n5. Lower: Slowly lower the pad back down until your legs are fully extended.",
    beginnerTips:
      "• Keep your hips pinned to the bench — don't let them lift up as you curl. \n• Move slowly; hamstrings respond well to a controlled tempo. \n• Point your toes toward your shins to further engage your hamstrings.",
    videoUrl: "https://www.youtube.com/watch?v=d8VJCaT5qoI",
  },
  {
    id: "84",
    name: "Seated Calf Raise",
    bodyPart: "Legs",
    equipment: "Machine",
    image: { uri: "https://img.youtube.com/vi/6O5hh1rBtx8/hqdefault.jpg" },
    description:
      "1. Setup: Sit at the machine with the balls of your feet on the platform and the pads resting on your lower thighs.\n2. Stretch: Let your heels drop down as far as comfortable for a deep calf stretch.\n3. Raise: Push through the balls of your feet to raise your heels as high as possible.\n4. Squeeze: Hold and squeeze your calves hard at the top.\n5. Lower: Slowly lower your heels back down to the fully stretched position.",
    beginnerTips:
      "• The bent-knee position targets the soleus muscle underneath your main calf muscle. \n• Avoid bouncing — control the weight through the full range. \n• Pause briefly at both the top and bottom of each rep for maximum contraction.",
    videoUrl: "https://www.youtube.com/watch?v=6O5hh1rBtx8",
  },
  {
    id: "85",
    name: "Hack Squat",
    bodyPart: "Legs",
    equipment: "Machine",
    image: { uri: "https://img.youtube.com/vi/fE5BWPy7uRc/hqdefault.jpg" },
    description:
      "1. Setup: Position yourself in the hack squat machine with your shoulders and back against the pads and feet shoulder-width apart on the platform.\n2. Unlock: Release the safety handles and straighten your legs to support the weight.\n3. Descend: Bend your knees to lower yourself down, keeping your back flat against the pad.\n4. Depth: Lower until your knees are bent to about 90 degrees or as deep as feels comfortable.\n5. Drive: Push through your heels to return to the starting position, without locking your knees out hard at the top.",
    beginnerTips:
      "• Keep your entire back pressed against the pad throughout the set. \n• Avoid letting your knees cave inward as you press. \n• Start light — the fixed path can put more stress on your knees than a free squat if the weight is too heavy.",
    videoUrl: "https://www.youtube.com/watch?v=fE5BWPy7uRc",
  },
  {
    id: "86",
    name: "Goblet Squat",
    bodyPart: "Legs",
    equipment: "Kettlebell or Dumbbell",
    image: { uri: "https://img.youtube.com/vi/JO7D6GJ98wY/hqdefault.jpg" },
    description:
      "1. Setup: Hold a dumbbell or kettlebell vertically against your chest with both hands, elbows pointing down.\n2. Stance: Stand with feet slightly wider than shoulder-width, toes turned out slightly.\n3. Descend: Push your hips back and bend your knees to squat down, keeping your chest up and elbows brushing your inner thighs.\n4. Depth: Squat down as low as you comfortably can while keeping your back flat.\n5. Drive: Push through your heels to stand back up, squeezing your glutes at the top.",
    beginnerTips:
      "• This is one of the best squat variations for beginners to learn proper depth and posture. \n• Keep the weight close to your chest throughout the movement. \n• Let your elbows track between your knees as you descend for extra depth.",
    videoUrl: "https://www.youtube.com/watch?v=JO7D6GJ98wY",
  },
  {
    id: "87",
    name: "Box Step-Up",
    bodyPart: "Legs",
    equipment: "Dumbbells, Box",
    image: { uri: "https://img.youtube.com/vi/vs87hPGdnCc/hqdefault.jpg" },
    description:
      "1. Setup: Stand facing a sturdy box or bench, holding a dumbbell in each hand at your sides.\n2. Step: Place one foot fully on top of the box.\n3. Drive: Push through that foot's heel to lift your body up onto the box, avoiding pushing off with your back foot.\n4. Stand: Stand fully upright on the box before lowering back down.\n5. Lower: Step back down with control, leading with the same foot you stepped up with.\n6. Repeat: Complete all reps on one leg before switching, or alternate legs each rep.",
    beginnerTips:
      "• Choose a box height where your knee doesn't go too far past 90 degrees at the bottom. \n• Avoid pushing off your trailing foot — the working leg should do all the lifting. \n• Step down under control rather than dropping down quickly.",
    videoUrl: "https://www.youtube.com/watch?v=vs87hPGdnCc",
  },
  {
    id: "88",
    name: "Hanging Knee Raise",
    bodyPart: "Core",
    equipment: "Pull-up Bar",
    image: { uri: "https://img.youtube.com/vi/p9hhX_Sx5v0/hqdefault.jpg" },
    description:
      "1. Setup: Hang from a pull-up bar with a comfortable grip, arms fully extended and body still.\n2. Raise: Using your lower abs, curl your knees up toward your chest.\n3. Peak: Bring your knees as high as you comfortably can without swinging.\n4. Lower: Slowly lower your legs back down to a full hang with control.\n5. Repeat: Keep your core braced throughout to avoid swinging between reps.",
    beginnerTips:
      "• This is a great stepping stone toward the full hanging leg raise. \n• Focus on curling your pelvis up rather than just lifting with your hip flexors. \n• If you start swinging, pause and reset rather than continuing with momentum.",
    videoUrl: "https://www.youtube.com/watch?v=p9hhX_Sx5v0",
  },
  {
    id: "89",
    name: "Cable Crunch",
    bodyPart: "Core",
    equipment: "Cable Machine",
    image: { uri: "https://img.youtube.com/vi/aBd6T01PBqw/hqdefault.jpg" },
    description:
      "1. Setup: Attach a rope to a high cable pulley and kneel facing the machine, holding the rope on either side of your head.\n2. Position: Sit back on your heels with your hips still.\n3. Crunch: Curl your torso down, bringing your elbows toward your knees by contracting your abs, not by pulling with your arms.\n4. Squeeze: Squeeze your abs hard at the bottom of the movement.\n5. Return: Slowly uncurl back up to the starting position, keeping tension on your abs.",
    beginnerTips:
      "• Keep your hips fixed in place — the movement should come from rounding your spine, not your hips moving back. \n• Use your abs to pull, not your arms or shoulders. \n• Exhale fully as you crunch down to help engage your abs deeper.",
    videoUrl: "https://www.youtube.com/watch?v=aBd6T01PBqw",
  },
  {
    id: "90",
    name: "Side Plank",
    bodyPart: "Core",
    equipment: "None",
    image: { uri: "https://img.youtube.com/vi/44ND4bOB-T0/hqdefault.jpg" },
    description:
      "1. Setup: Lie on your side and prop yourself up on one forearm, elbow directly under your shoulder.\n2. Body Line: Stack your feet on top of each other and lift your hips off the floor so your body forms a straight line.\n3. Engage: Squeeze your obliques and glutes to keep your hips lifted.\n4. Hold: Hold this position for a set time without letting your hips sag or rotate.\n5. Switch: Lower back down and repeat on the other side.",
    beginnerTips:
      "• Drop to your knees instead of your feet if the full version is too difficult at first. \n• Keep your hips stacked directly on top of each other, not rotated forward or back. \n• Breathe steadily throughout the hold instead of holding your breath.",
    videoUrl: "https://www.youtube.com/watch?v=44ND4bOB-T0",
  },
  {
    id: "91",
    name: "Ab Wheel Rollout",
    bodyPart: "Core",
    equipment: "Ab Wheel",
    image: { uri: "https://img.youtube.com/vi/j6lR4u193gE/hqdefault.jpg" },
    description:
      "1. Setup: Kneel on the floor holding an ab wheel with both hands, positioned under your shoulders.\n2. Brace: Tighten your core and glutes before you begin moving.\n3. Roll: Slowly roll the wheel forward, extending your body out as far as you can while keeping your back flat.\n4. Limit: Stop before your lower back starts to sag or arch.\n5. Return: Use your abs to pull the wheel back in toward your knees to the starting position.",
    beginnerTips:
      "• Start with small, partial rollouts and gradually increase your range as your core gets stronger. \n• Never let your lower back sag toward the floor — that's a sign you've gone too far. \n• Keep your arms mostly straight and let your core, not your shoulders, drive the movement.",
    videoUrl: "https://www.youtube.com/watch?v=j6lR4u193gE",
  },
  {
    id: "92",
    name: "Bicycle Crunch",
    bodyPart: "Core",
    equipment: "None",
    image: { uri: "https://img.youtube.com/vi/wpRI3xBhJmo/hqdefault.jpg" },
    description:
      "1. Setup: Lie on your back with hands lightly behind your head and knees bent, lifted off the floor.\n2. Rotate: Bring one knee toward your chest while rotating your torso to bring the opposite elbow toward that knee.\n3. Extend: At the same time, extend your other leg straight out, hovering just above the floor.\n4. Switch: Alternate sides in a smooth, pedaling motion.\n5. Pace: Keep the movement controlled — this is not a race.",
    beginnerTips:
      "• Focus on rotating your torso, not just banging your elbow into your knee. \n• Keep your lower back pressed into the floor throughout. \n• Slow the pace down if you feel your neck straining — let your abs do the work, not your hands.",
    videoUrl: "https://www.youtube.com/watch?v=wpRI3xBhJmo",
  },
  {
    id: "93",
    name: "Farmer's Carry",
    bodyPart: "Core",
    equipment: "Dumbbells or Kettlebells",
    image: { uri: "https://img.youtube.com/vi/VBobkldqqvk/hqdefault.jpg" },
    description:
      "1. Setup: Stand between two heavy dumbbells or kettlebells and grip one in each hand.\n2. Stand: Stand up tall with your shoulders back and core braced.\n3. Walk: Walk forward in a straight line, taking controlled steps.\n4. Posture: Keep your torso upright and avoid leaning to either side.\n5. Finish: Set the weights down under control once you've covered the target distance or time.",
    beginnerTips:
      "• Keep your shoulders pulled back and down rather than letting them round forward or shrug up. \n• Take shorter, controlled steps rather than rushing. \n• Grip strength often fails before your core does — that's normal and will improve with practice.",
    videoUrl: "https://www.youtube.com/watch?v=VBobkldqqvk",
  },
  {
    id: "94",
    name: "Kettlebell Swing",
    bodyPart: "Legs, Core",
    equipment: "Kettlebell",
    image: { uri: "https://img.youtube.com/vi/1Qi0NQW89Oc/hqdefault.jpg" },
    description:
      "1. Setup: Stand with feet shoulder-width apart, kettlebell on the floor a short distance in front of you.\n2. Hike: Hinge at your hips to grab the kettlebell, then hike it back between your legs like a football snap.\n3. Drive: Explosively drive your hips forward, standing up tall to swing the kettlebell up to chest height.\n4. Float: Let the kettlebell float weightlessly for a moment at the top as your hips finish extending.\n5. Return: Let the kettlebell fall back naturally, hinging at your hips to absorb it and swing it back between your legs.\n6. Repeat: Keep the motion continuous and driven by your hips, not your arms or shoulders.",
    beginnerTips:
      "• This is a hip-hinge power move, not a squat or a shoulder raise — your arms should stay relatively passive. \n• Keep your back flat throughout; never round it as the kettlebell swings between your legs. \n• Start with a lighter kettlebell to master the hip-hinge timing before increasing weight.",
    videoUrl: "https://www.youtube.com/watch?v=1Qi0NQW89Oc",
  },
  {
    id: "95",
    name: "Burpee",
    bodyPart: "Core",
    equipment: "None",
    image: { uri: "https://img.youtube.com/vi/G2hv_NYhM-A/hqdefault.jpg" },
    description:
      "1. Setup: Start standing tall with your feet shoulder-width apart.\n2. Drop: Squat down and place your hands on the floor in front of you.\n3. Jump Back: Kick your feet back into a plank position.\n4. Push-Up: Perform a push-up (optional for beginners), then jump your feet back up to your hands.\n5. Explode: Explosively jump up into the air, reaching your arms overhead.\n6. Land: Land softly with bent knees and immediately begin the next rep.",
    beginnerTips:
      "• Remove the push-up and the jump at first to build up the pattern and your conditioning. \n• Land softly with bent knees each time to protect your joints. \n• Keep your core braced as you transition from the plank into the jump forward.",
    videoUrl: "https://www.youtube.com/watch?v=G2hv_NYhM-A",
  },
  {
    id: "96",
    name: "Battle Ropes",
    bodyPart: "Core",
    equipment: "Battle Ropes",
    image: { uri: "https://img.youtube.com/vi/uyaANzMXQHY/hqdefault.jpg" },
    description:
      "1. Setup: Stand with feet shoulder-width apart, knees slightly bent, holding one end of the rope in each hand.\n2. Brace: Keep your core tight and your chest up.\n3. Wave: Rapidly raise and lower your arms in an alternating wave pattern, sending waves down the ropes.\n4. Pace: Maintain a steady, powerful rhythm for the set duration.\n5. Rest: Let the ropes settle and rest as needed between sets.",
    beginnerTips:
      "• Keep a slight bend in your knees and hips throughout — this isn't just an arm exercise. \n• Start with shorter intervals (15-20 seconds) since this movement is highly demanding on your conditioning. \n• Keep your core tight to protect your lower back as your arms move quickly.",
    videoUrl: "https://www.youtube.com/watch?v=uyaANzMXQHY",
  },
  {
    id: "97",
    name: "Rowing Machine Intervals",
    bodyPart: "Core",
    equipment: "Rowing Machine",
    image: { uri: "https://img.youtube.com/vi/4zWu1yuJ0_g/hqdefault.jpg" },
    description:
      "1. Setup: Sit on the rowing machine with your feet strapped in and knees bent, gripping the handle with arms extended.\n2. Drive: Push through your legs first, then lean your torso back slightly, then pull the handle to your lower ribs.\n3. Sequence: Reverse the order on the way back — arms extend, torso leans forward, then knees bend to slide forward.\n4. Interval: Row hard for a set work period (e.g., 30 seconds), then row easy or rest for a recovery period.\n5. Repeat: Cycle through work and rest intervals for the target number of rounds.",
    beginnerTips:
      "• Remember the order: legs, then torso, then arms on the drive; arms, then torso, then legs on the return. \n• Keep your back flat and avoid rounding forward at the catch position. \n• Start with a moderate pace before adding hard intervals so your form stays solid under fatigue.",
    videoUrl: "https://www.youtube.com/watch?v=4zWu1yuJ0_g",
  },
];
