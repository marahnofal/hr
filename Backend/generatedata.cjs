const fs = require('fs');

const users =  [
    {
      "id": "u-001",
      "name": "Sarah Jenkins",
      "email": "sarah.admin@company.com",
      "password": "hashed_password_123",
      "job_title": "Admin",
      "role": "admin",
      "department_id": "GLOBAL",
      "token": "atkn_global_2026_99x"
    },
    {
      "id": "u-002",
      "name": "Marcus Thorne",
      "email": "marcus.web@company.com",
      "password": "hashed_password_web_mgr",
      "job_title": "Senior Team Leader",
      "role": "manager",
      "department_id": "WEB",
      "token": "mtkn_web_2026_44m"
    },
    {
      "id": "u-003",
      "name": "David Kim",
      "email": "david.mobile@company.com",
      "password": "hashed_password_mobile_mgr",
      "job_title": "Senior Team Leader",
      "role": "manager",
      "department_id": "MOBILE",
      "token": "mtkn_mobile_2026_11k"
    },
    {
      "id": "u-004",
      "name": "Elena Rodriguez",
      "email": "elena.design@company.com",
      "password": "hashed_password_design_mgr",
      "job_title": "Senior Team Leader",
      "role": "manager",
      "department_id": "DESIGN",
      "token": "mtkn_design_2026_77r"
    },
    {
      "id": "u-005",
      "name": "Jason Smith",
      "email": "jason.quality@company.com",
      "password": "hashed_password_quality_mgr",
      "job_title": "Senior Team Leader",
      "role": "manager",
      "department_id": "QUALITY",
      "token": "mtkn_quality_2026_55s"
    },
    {
      "id": "u-006",
      "name": "Alice Wong",
      "email": "alice.w@company.com",
      "password": "pass_6",
      "job_title": "Senior Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_006"
    },
    {
      "id": "u-007",
      "name": "Bob Miller",
      "email": "bob.m@company.com",
      "password": "pass_7",
      "job_title": "Mid Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_007"
    },
    {
      "id": "u-008",
      "name": "Charlie Davis",
      "email": "charlie.d@company.com",
      "password": "pass_8",
      "job_title": "Junior Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_008"
    },
    {
      "id": "u-009",
      "name": "Diana Prince",
      "email": "diana.p@company.com",
      "password": "pass_9",
      "job_title": "Senior Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_009"
    },
    {
      "id": "u-010",
      "name": "Ethan Hunt",
      "email": "ethan.h@company.com",
      "password": "pass_10",
      "job_title": "Junior Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_010"
    },
    {
      "id": "u-011",
      "name": "Fiona Gallagher",
      "email": "fiona.g@company.com",
      "password": "pass_11",
      "job_title": "Mid Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_011"
    },
    {
      "id": "u-012",
      "name": "George Bluth",
      "email": "george.b@company.com",
      "password": "pass_12",
      "job_title": "Senior Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_012"
    },
    {
      "id": "u-013",
      "name": "Hannah Abbott",
      "email": "hannah.a@company.com",
      "password": "pass_13",
      "job_title": "Junior Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_013"
    },
    {
      "id": "u-014",
      "name": "Ian Somer",
      "email": "ian.s@company.com",
      "password": "pass_14",
      "job_title": "Mid Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_014"
    },
    {
      "id": "u-015",
      "name": "Julia Roberts",
      "email": "julia.r@company.com",
      "password": "pass_15",
      "job_title": "Senior Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_015"
    },
    {
      "id": "u-016",
      "name": "Kevin Hart",
      "email": "kevin.h@company.com",
      "password": "pass_16",
      "job_title": "Mid Web Developer",
      "role": "employee",
      "department_id": "WEB",
      "token": "etkn_web_016"
    },
    {
      "id": "u-017",
      "name": "Luna Love",
      "email": "luna.l@company.com",
      "password": "pass_17",
      "job_title": "Senior Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_017"
    },
    {
      "id": "u-018",
      "name": "Mike Ross",
      "email": "mike.r@company.com",
      "password": "pass_18",
      "job_title": "Mid Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_018"
    },
    {
      "id": "u-019",
      "name": "Nina Simone",
      "email": "nina.s@company.com",
      "password": "pass_19",
      "job_title": "Junior Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_019"
    },
    {
      "id": "u-020",
      "name": "Oscar Wilde",
      "email": "oscar.w@company.com",
      "password": "pass_20",
      "job_title": "Senior Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_020"
    },
    {
      "id": "u-021",
      "name": "Peter Parker",
      "email": "peter.p@company.com",
      "password": "pass_21",
      "job_title": "Mid Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_021"
    },
    {
      "id": "u-022",
      "name": "Quinn Fabray",
      "email": "quinn.f@company.com",
      "password": "pass_22",
      "job_title": "Junior Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_022"
    },
    {
      "id": "u-023",
      "name": "Riley Reid",
      "email": "riley.r@company.com",
      "password": "pass_23",
      "job_title": "Senior Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_023"
    },
    {
      "id": "u-024",
      "name": "Steve Rogers",
      "email": "steve.r@company.com",
      "password": "pass_24",
      "job_title": "Mid Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_024"
    },
    {
      "id": "u-025",
      "name": "Tony Stark",
      "email": "tony.s@company.com",
      "password": "pass_25",
      "job_title": "Junior Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_025"
    },
    {
      "id": "u-026",
      "name": "Uma Thurman",
      "email": "uma.t@company.com",
      "password": "pass_26",
      "job_title": "Senior Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_026"
    },
    {
      "id": "u-027",
      "name": "Victor Hugo",
      "email": "victor.h@company.com",
      "password": "pass_27",
      "job_title": "Mid Mobile Developer",
      "role": "employee",
      "department_id": "MOBILE",
      "token": "etkn_mob_027"
    },
    {
      "id": "u-028",
      "name": "Wanda Maxim",
      "email": "wanda.m@company.com",
      "password": "pass_28",
      "job_title": "Senior Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_028"
    },
    {
      "id": "u-029",
      "name": "Xavier Men",
      "email": "xavier.m@company.com",
      "password": "pass_29",
      "job_title": "Mid Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_029"
    },
    {
      "id": "u-030",
      "name": "Yara Grey",
      "email": "yara.g@company.com",
      "password": "pass_30",
      "job_title": "Junior Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_030"
    },
    {
      "id": "u-031",
      "name": "Zane Grey",
      "email": "zane.g@company.com",
      "password": "pass_31",
      "job_title": "Senior Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_031"
    },
    {
      "id": "u-032",
      "name": "Aaron Paul",
      "email": "aaron.p@company.com",
      "password": "pass_32",
      "job_title": "Mid Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_032"
    },
    {
      "id": "u-033",
      "name": "Bella Swan",
      "email": "bella.s@company.com",
      "password": "pass_33",
      "job_title": "Junior Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_033"
    },
    {
      "id": "u-034",
      "name": "Caleb Finch",
      "email": "caleb.f@company.com",
      "password": "pass_34",
      "job_title": "Senior Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_034"
    },
    {
      "id": "u-035",
      "name": "Daisy Ridley",
      "email": "daisy.r@company.com",
      "password": "pass_35",
      "job_title": "Mid Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_035"
    },
    {
      "id": "u-036",
      "name": "Eli Manning",
      "email": "eli.m@company.com",
      "password": "pass_36",
      "job_title": "Junior Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_036"
    },
    {
      "id": "u-037",
      "name": "Frank Castle",
      "email": "frank.c@company.com",
      "password": "pass_37",
      "job_title": "Senior Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_037"
    },
    {
      "id": "u-038",
      "name": "Gina Lin",
      "email": "gina.l@company.com",
      "password": "pass_38",
      "job_title": "Mid Designer",
      "role": "employee",
      "department_id": "DESIGN",
      "token": "etkn_des_038"
    },
    {
      "id": "u-039",
      "name": "Harry Potter",
      "email": "harry.p@company.com",
      "password": "pass_39",
      "job_title": "Senior QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_039"
    },
    {
      "id": "u-040",
      "name": "Iris West",
      "email": "iris.w@company.com",
      "password": "pass_40",
      "job_title": "Mid QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_040"
    },
    {
      "id": "u-041",
      "name": "Jack Sparrow",
      "email": "jack.s@company.com",
      "password": "pass_41",
      "job_title": "Junior QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_041"
    },
    {
      "id": "u-042",
      "name": "Katniss Ever",
      "email": "katniss.e@company.com",
      "password": "pass_42",
      "job_title": "Senior QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_042"
    },
    {
      "id": "u-043",
      "name": "Liam Neeson",
      "email": "liam.n@company.com",
      "password": "pass_43",
      "job_title": "Mid QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_043"
    },
    {
      "id": "u-044",
      "name": "Mary Poppin",
      "email": "mary.p@company.com",
      "password": "pass_44",
      "job_title": "Junior QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_044"
    },
    {
      "id": "u-045",
      "name": "Nate Archi",
      "email": "nate.a@company.com",
      "password": "pass_45",
      "job_title": "Senior QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_045"
    },
    {
      "id": "u-046",
      "name": "Olivia Pope",
      "email": "olivia.p@company.com",
      "password": "pass_46",
      "job_title": "Mid QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_046"
    },
    {
      "id": "u-047",
      "name": "Piper Halli",
      "email": "piper.h@company.com",
      "password": "pass_47",
      "job_title": "Junior QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_047"
    },
    {
      "id": "u-048",
      "name": "Quentin Cold",
      "email": "quentin.c@company.com",
      "password": "pass_48",
      "job_title": "Senior QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_048"
    },
    {
      "id": "u-049",
      "name": "Rosa Diaz",
      "email": "rosa.d@company.com",
      "password": "pass_49",
      "job_title": "Mid QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_049"
    },
    {
      "id": "u-050",
      "name": "Sam Winchester",
      "email": "sam.w@company.com",
      "password": "pass_50",
      "job_title": "Junior QA Engineer",
      "role": "employee",
      "department_id": "QUALITY",
      "token": "etkn_qa_050"
    }
  ]

const attendance = [];

const WORK_START = 9;
const year = 2026;
const month = 0; // January (0-based)

function randomCheckIn() {
  const r = Math.random();
  if (r < 0.15) return null; // leave
  const minutes = r < 0.7 ? 0 : Math.floor(Math.random() * 30);
  return `09:${String(minutes).padStart(2, '0')}`;
}

function getStatus(checkIn) {
  if (!checkIn) return 'leave';
  return checkIn <= '09:05' ? 'ontime' : 'late';
}

let idCounter = 1;

users
  .filter(u => u.role === 'employee')
  .forEach(user => {
    for (let d = 1; d <= 31; d++) {
      const date = new Date(year, month, d);
      const day = date.getDay();

      // Skip weekends
      if (day === 0 || day === 6) continue;

      const checkIn = randomCheckIn();

      attendance.push({
        id: `att-${String(idCounter++).padStart(4, '0')}`,
        user_id: user.id,
        employee_name: user.name,
        department_id: user.department_id,
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        check_in: checkIn,
        status: getStatus(checkIn)
      });
    }
  });

fs.writeFileSync(
  './attendance.json',
  JSON.stringify({ users, attendance }, null, 2)
);

console.log('✅ db.json generated successfully');
