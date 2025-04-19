
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "../Componants/Button";
import { FaAngleRight } from "react-icons/fa";
import HeaderIntro from "../assets/Header.png";
import "../styles/register.css";
import logo from "../assets/Vector.png";
import { useNavigate } from "react-router-dom";
import AuthFooter from "../Componants/AuthFooter";

const Message = styled.p`
  color: ${(props) => (props.error ? "red" : "green")};
  font-size: 14px;
  margin-bottom: 10px;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    mobile_number: "",
    address: "",
    bod: "",
    is_nurse: false,
  });
  const [gov, setGov] = useState("");
  const [index, setIndex] = useState();
  let [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({}); // State to track errors for each field
  const [message, setMessage] = useState(""); // State to track success or failure messages
  const [isError, setIsError] = useState(false); // State to track if the message is an error
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === gov) {
      setGov(e.target.value);
      setFlag(true);
      const selectedOption = e.target.options[e.target.selectedIndex];
      setIndex(selectedOption.getAttribute("index"));
      console.log("Index of selected option:", index);
    }
    setMessage(""); // Clear message when user starts typing
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field being edited
  };

  const validateForm = () => {
    const newErrors = {};
    const { first_name, last_name, user_name, email, password, mobile_number, address, bod } = formData;

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح.";
    }

    // Name validation (only letters, at least 3 characters)
    if (!/^[A-Za-z\u0621-\u064A\s]+$/.test(first_name) || first_name.length < 3) {
      newErrors.first_name = "الاسم الأول يجب أن يحتوي على أحرف فقط ويكون 3 أحرف على الأقل.";
    }

    if (!/^[A-Za-z\u0621-\u064A\s]+$/.test(last_name) || last_name.length < 3) {
      newErrors.last_name = "اسم العائلة يجب أن يحتوي على أحرف فقط ويكون 3 أحرف على الأقل.";
    }

      // Username validation (at least 3 characters, no spaces, allows only letters, numbers, and underscores)
  if (!/^[A-Za-z0-9_]{3,}$/.test(user_name)) {
    newErrors.user_name = "اسم المستخدم يجب أن يكون 3 أحرف على الأقل، بدون مسافات، ويشمل أحرف، أرقام، و'_' فقط.";
  }
    // Password validation (at least 8 characters, includes letters, numbers, and special characters)
if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
  newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل، وتشمل أحرف وأرقام ورموز خاصة.";
}

    // Mobile number validation (only digits)
    if (!/^\d+$/.test(mobile_number)) {
      newErrors.mobile_number = "رقم الهاتف يجب أن يحتوي على أرقام فقط.";
    }

    // Address validation (at least 5 characters)
    if (address.length < 5) {
      newErrors.address = "العنوان يجب أن يكون 5 أحرف على الأقل.";
    }

    // Date of birth validation (must be selected)
    if (!bod) {
      newErrors.bod = "يرجى إدخال تاريخ الميلاد.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // setMessage("يرجى تصحيح الأخطاء في النموذج.");
      setIsError(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      setMessage(res.data.message || "تم التسجيل بنجاح.");
      setIsError(false);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.error || "فشل التسجيل.");
      setIsError(true);
    }
  };
  const [city, setCity] = useState([
    [
      "اغاخان",
      "الازبكية",
      "الازهر",
      "الاميرية",
      "البساتين",
      "التبين",
      "الجزيرة",
      "الجمالية",
      "الحرفيين",
      "الحسين",
      "الحلمية",
      "الحلمية الجديدة",
      "الخليفة",
      "الدراسة",
      "الدرب الاحمر",
      "الروضة",
      "الزاوية الحمراء",
      "الزمالك",
      "الزيتون",
      "الساحل",
      "السبتية",
      "السكاكينى",
      "السواح",
      "السيدة زينب",
      "السيدة عائشة",
      "السيدة نفيسة",
      "الشرابية",
      "الظاهر",
      "العتبة",
      "الفجالة",
      "الفسطاط",
      "القاهرة الجديدة",
      "القبة الجديدة",
      "القطامية",
      "المرج",
      "المرج الجديدة",
      "المطرية",
      "المعادى",
      "المعصرة",
      "المقطم",
      "الملك الصالح",
      "المنيرة",
      "المنيل",
      "الموسكى",
      "النزهة الجديدة",
      "الهايكستب",
      "الوايلى",
      "باب الخلق",
      "باب الشعرية",
      "باب اللوق",
      "بولاق",
      "اغاخان",
      "الازبكية",
      "الازهر",
      "الاميرية",
      "البساتين",
      "التبين",
      "الجزيرة",
      "الجمالية",
      "الحرفيين",
      "الحسين",
      "الحلمية",
      "الحلمية الجديدة",
      "الخليفة",
      "الدراسة",
      "الدرب الاحمر",
      "الروضة",
      "الزاوية الحمراء",
      "الزمالك",
      "الزيتون",
      "الساحل",
      "السبتية",
      "السكاكينى",
      "السواح",
      "السيدة زينب",
      "السيدة عائشة",
      "السيدة نفيسة",
      "الشرابية",
      "الظاهر",
      "العتبة",
      "الفجالة",
      "الفسطاط",
      "القاهرة الجديدة",
      "القبة الجديدة",
      "القطامية",
      "المرج",
      "المرج الجديدة",
      "المطرية",
      "المعادى",
      "المعصرة",
      "المقطم",
      "الملك الصالح",
      "المنيرة",
      "المنيل",
      "الموسكى",
      "النزهة الجديدة",
      "الهايكستب",
      "الوايلى",
      "باب الخلق",
      "باب الشعرية",
      "باب اللوق",
      "بولاق",
      "جاردن سيتى",
      "جسر السويس",
      "حدائق الزيتون",
      "حدائق القبة",
      "حدائق حلوان",
      "حلمية الزيتون",
      "حلوان",
      "حمامات القبة",
      "خان الخليلى",
      "دار السلام",
      "رملة بولاق",
      "روض الفرج",
      "سراى القبة",
      "شبرا",
      "شبرا",
      "شق الثعبان",
      "طره",
      "طريق القاهرة السويس",
      "طريق مصر الاسماعيلية الصحراوى",
      "عابدين",
      "عباسية",
      "عزبة النخل",
      "عين الصيرة",
      "عين شمس",
      "عين شمس الشرقية",
      "عين شمس الغربية",
      "غمره",
      "فم الخليج",
      "قصر العينى",
      "قلعة",
      "كفر العلو",
      "كوبرى القبة",
      "كوتسيكا",
      "لاظوغلى",
      "مؤسسة الزكاة",
      "مدينة 15 مايو",
      "مدينة الرحاب",
      "مدينة السلام",
      "مدينة الشروق",
      "مدينة بدر",
      "مدينة قباء",
      "مدينة نصر",
      "مدينة نصر",
      "مدينتى",
      "مصر الجديدة",
      "مصر الجديده",
      "مصر القديمة",
      "منشية ناصر",
      "منيل الروضة",
      "وادى حوف",
      "وسط البلد",
    ],
    [
      "ابو يوسف",
      "ابى الدرداء",
      "ابى العباس",
      "ابيس",
      "ارض الصبحية",
      "ارض تشاكوس",
      "الابراهيمية",
      "الازاريطة",
      "الاقبال",
      "الانفوشى",
      "الباب الجديد",
      "البستان",
      "البيطاش",
      "الجمرك",
      "الحضرة",
      "الحضرة الجديدة",
      "الحضرة بحرى",
      "الحضرة قبلى",
      "الحى اللاتينى",
      "الدخيلة",
      "الرأس السوداء",
      "الرمل الميرى",
      "السرايا",
      "السكة الجديدة",
      "السلطان حسين",
      "السيوف",
      "السيوف بحرى",
      "السيوف ترام",
      "السيوف شماعة",
      "الشاطبى",
      "الشلالات",
      "الطابية",
      "الظاهرية",
      "العامرية",
      "العجمى",
      "العصافرة",
      "العصافرة بحرى",
      "العصافرة قبلى",
      "العطارين",
      "العوايد",
      "الفراعنة",
      "القبارى",
      "اللبان",
      "المتراس",
      "المسلة شرق",
      "المعمورة",
      "المعمورة البلد",
      "المعمورة الشاطئ",
      "المفروزة",
      "المكس",
      "الملاحة",
      "المنتزه",
      "المندرة",
      "المندرة البحرية",
      "المندره قبلى",
      "المنشية",
      "المنشية الجديدة",
      "المنشية الصغرى",
      "المينا الشرقية",
      "الناصرية",
      "النزهة",
      "الهانوفيل",
      "الهداية",
      "الورديان",
      "الوزارة",
      "ام زغيو",
      "امبروزو",
      "اول الرمل",
      "باب سدرة",
      "باب شرق",
      "باكوس",
      "بحرى",
      "برج العرب",
      "برج العرب الجديدة",
      "بولكلى",
      "بيانكى",
      "ثانى الرمل",
      "ثروت",
      "جليم",
      "جناكليس",
      "حجر النواتية",
      "خورشيد",
      "رأس التين",
      "راغب",
      "رشدى",
      "زيزينيا",
      "سابا باشا",
      "سان استيفانو",
      "سبورتنج",
      "سبورتنج الصغرى",
      "سبورتنج الكبرى",
      "ستانلى",
      "سموحة",
      "سيدى بشر",
      "سيدى بشر",
      "سيدى بشر الترام",
      "سيدى بشر بحرى",
      "سيدى بشر قبلى",
      "سيدى جابر",
      "سيدى جابر الشيخ",
      "سيدى جابر المحطة",
      "شدس",
      "صفر",
      "طريق الاسكندرية القاهرة الزراعى",
      "طريق الاسكندرية القاهرة الصحراوى",
      "غبريال",
      "غربال",
      "غيط العنب",
      "فلمينج",
      "فيكتوريا",
      "كامب شيزار",
      "كرموز",
      "كفر عبده",
      "كليوباترا",
      "كليوباترا الصغرى",
      "كليوباترا المحطة",
      "كليوباترا حمامات",
      "كوم الدكة",
      "كوم الشقافة",
      "كينج مريوط",
      "لوران",
      "محرم بك",
      "محطة الرمل",
      "محطة مصر",
      "مرغم",
      "مرغم قبلى",
      "مصطفى كامل",
      "منشية النزهة",
      "منطقة المطار",
      "ميامى",
      "ميدان الساعة",
      "مينا البصل",
      "وابور المياه",
      "وادى القمر",
      "وينجت",
    ],
    [
      "ابو النمرس",
      "ابو رواش",
      "اطفيح",
      "البدرشين",
      "البراجيل",
      "الجيزة",
      "الحوامدية",
      "الدقى",
      "السادس من اكتوبر",
      "الصحفيين",
      "الصف",
      "العجوزة",
      "العياط",
      "الكيت كات",
      "المنيب",
      "المهندسين",
      "المهندسين",
      "الهرم",
      "الوراق",
      "امبابه",
      "اوسيم",
      "بولاق الدكرور",
      "بين السرايات",
      "جزيرة الذهب",
      "سقارة",
      "طموه",
      "فيصل",
      "كرداسة",
      "منشية القناطر",
    ],
    [
      "ابو حماد",
      "ابو كبير",
      "الابراهيمية",
      "الحسينية",
      "الزقازيق",
      "العاشر من رمضان",
      "القرين",
      "القنايات",
      "اولاد صقر",
      "بلبيس",
      "ديرب نجم",
      "فاقوس",
      "كفر صقر",
      "مشتول السوق",
      "منيا القمح",
      "ههيا",
    ],
    [
      "اجا",
      "الجمالية",
      "السنبلاوين",
      "الكردى",
      "المطرية",
      "المنزلة",
      "المنصورة",
      "بلقاس",
      "جمصة",
      "دكرنس",
      "شربين",
      "طلخا",
      "طماى الامديد",
      "منية النصر",
      "منيه سمنود",
      "ميت سلسيل",
      "ميت غمر",
      "نبروه",
    ],
    [
      "الجونة",
      "الغردقة",
      "القصير",
      "جزيرة سفاجا",
      "جنوب قصير",
      "سفاجا",
      "سهل حشيش",
      "طريق القرى",
      "كفر الجونة",
    ],
    [
      "السنطة",
      "المحلة الكبرى",
      "بسيون",
      "زفتا",
      "سمنود",
      "طنطا",
      "قطور",
      "كفر الزيات",
    ],
    [
      "ابشواى",
      "اطسا",
      "البحارى",
      "الجامعة",
      "الحادقة",
      "السبع سواقى",
      "السيالة",
      "الصوفى",
      "الفيوم",
      "المسلة",
      "دلة",
      "سنورس",
      "طامية",
      "طريق مصر الفيوم الصحراوى",
      "كوم اوشيم",
      "منشأة لطف الله",
      "يوسف الصديق",
    ],
    [
      "ابو خليفة",
      "ابو سلطان",
      "ابو صوير البلاد",
      "ابو صوير المحطة",
      "التل الكبير",
      "الثلاثينى",
      "الشيخ زايد",
      "الطريق الدائرى",
      "القصاصين الجديدة",
      "القصاصين القديمة",
      "المحطة الجديدة",
      "المنطقة الصناعية",
      "جبل مريم",
      "حى الاعلام",
      "حى الزهور",
      "حى السلام",
      "حى الصفا",
      "حى المدينة",
      "حى ثالث",
      "سرابيوم",
      "طريق اسماعيلية مصر الصحراوى",
      "فايد",
      "قنطرة شرق",
      "قنطرة غرب",
      "مستقبل",
      "منشية الشهداء",
      "منطقة التمليك",
      "نفيشة",
      "وسط البلد",
    ],
    [
      "الحامول",
      "الرياض",
      "بلطيم",
      "بيلا",
      "تقسيم 2",
      "حى شرق",
      "دسوق",
      "رشيد",
      "سخا",
      "سيدى سالم",
      "سيدى غازى",
      "فوه",
      "قلين",
      "مساكن الحلقة",
      "مطوبس",
    ],
    ["الابيض", "رأس الحكمة", "رأس الخيمة", "سيدى برانى", "عجيبة", "علم الروم"],
    [
      "شبين الكوم",
      "الباجور",
      "الشهداء",
      "قويسنا",
      "منوف",
      "سرس الليان",
      "بركه السبع",
      "تلا",
    ],
    [
      "ابو طشت",
      "ارمنت",
      "اسنا",
      "المعنا",
      "الوقف",
      "بندر قنا",
      "دشنا",
      "طريق قنا سفاجا",
      "طريق مصر اسوان",
      "فرشوط",
      "قفط",
      "قوص",
      "مركز قنا",
      "نجع حمادى",
      "نقادة",
      "وسط البلد",
    ],
    [],
    [
      "ابو الريش",
      "ابو سمبل",
      "ادفو",
      "اسوان",
      "اطلس",
      "البصيلية",
      "الرديسية قبلى",
      "السباعية غرب",
      "السيل شرق",
      "السيل غرب",
      "الكورنيش",
      "بحيرة ناصر",
      "حى الشروق",
      "دراو",
      "عنيبه",
      "كلابشة",
      "كوم امبو",
      "نصر النوبة",
    ],
    [
      "اخميم",
      "البلينا",
      "العسيرات",
      "الكوثر",
      "المراغة",
      "المنشاه",
      "بنى هلال",
      "جرجا",
      "جهينة",
      "حى شرق",
      "حى غرب",
      "دار السلام",
      "ساقلتة",
      "سوهاج",
      "طما",
      "طهطا",
      "نجع اولاد نصير",
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  
  const handleCity = (e) => {
    console.log(e.target.value);
    setGov(e.target.value);
    setFlag(true);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setIndex(selectedOption.getAttribute("index"));
    console.log("Index of selected option:", index);
  };
  return (
    <div className="col-11 col-md-8 col-lg-8 mx-auto bg-white rounded-3 overflow-hidden pb-3 m-4" id="register-container">
      <div id="intro-header-container">
        <img src={HeaderIntro} alt="" id="intro-header" />
        <div className="flex-item">
          <FaAngleRight className="icon" onClick={() => navigate(-1)} />
        </div>
        <div className="flex-item fs-3 fw-bold">
          <h2 className="abda">ابدا مع ONurse</h2>
        </div>
        <div className="flex-item"></div>
      </div>
      <img src={logo} alt="" className="logo-login m-auto d-block" />
      <h2 className="title-login text-center fs-1 fw-bold">انشاء حساب </h2>
   
      <div className="padding">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6">
              <label htmlFor="first_name" className="form-label">الاسم الاول</label>
              <input
                className="mb-3 form-control"
                type="text"
                id="first_name"
                name="first_name"
                placeholder="الاسم الاول"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              {errors.first_name && <p className="text-danger">{errors.first_name}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="last_name" className="form-label">اسم العائله</label>
              <input
                className="mb-3 form-control"
                type="text"
                id="last_name"
                name="last_name"
                placeholder="اسم العائله"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              {errors.last_name && <p className="text-danger">{errors.last_name}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <label htmlFor="email" className="form-label"> الايميل</label>
              <input
                className="mb-3 form-control"
                type="email"
                id="email"
                name="email"
                placeholder=" الايميل"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="mobile_number" className="form-label"> رقم الهاتف</label>
              <input
                className="mb-3 form-control"
                type="text"
                id="mobile_number"
                name="mobile_number"
                placeholder="ادخل رقم الهاتف"
                value={formData.mobile_number}
                onChange={handleChange}
                required
              />
              {errors.mobile_number && <p className="text-danger">{errors.mobile_number}</p>}
            </div>
          </div>
          <div className="row">
 {/* Governorate selection */}
 <div class="col-6">
              <label for="gov" class="form-label">
                المحافظه
              </label>
              <select
                class="form-select"
                id="gov"
                onChange={(e) => {
                  handleChange(e);
                  handleCity(e);
                }}
                required
                               name="country"
                value={formData.governorate}
              >
                <option selected disabled value="">
                  اختر المحافظه
                </option>
                <option value="القاهرة" index={0}>
                  القاهرة
                </option>
                <option value="الإسكندرية" index={1}>
                  الإسكندرية
                </option>
                <option value="الجيزة" index={2}>
                  الجيزة
                </option>
                <option value="الشرقية" index={3}>
                  الشرقية
                </option>
                <option value="الدقهلية" index={4}>
                  الدقهلية
                </option>
                <option value="البحر الأحمر" index={5}>
                  البحر الأحمر
                </option>
                <option value="الغربية" index={6}>
                  الغربية
                </option>
                <option value="الفيوم" index={7}>
                  الفيوم
                </option>
                <option value="الإسماعيلية" index={8}>
                  الإسماعيلية
                </option>
                <option value="كفر الشيخ" index={9}>
                  كفر الشيخ
                </option>
                <option value="مطروح" index={10}>
                  مطروح
                </option>
                <option value="المنوفية" index={11}>
                  المنوفية
                </option>
                <option value="قنا" index={12}>
                  قنا
                </option>
                <option value="الأقصر" index={13}>
                  الأقصر
                </option>
                <option value="أسوان" index={14}>
                  أسوان
                </option>
                <option value="سوهاج" index={15}>
                  سوهاج
                </option>
                <option value="بني سويف" index={16}>
                  بني سويف
                </option>
                <option value="الوادي الجديد" index={17}>
                  الوادي الجديد
                </option>
                <option value="البحيرة" index={18}>
                  البحيرة
                </option>
                <option value="شمال سيناء" index={19}>
                  شمال سيناء
                </option>
                <option value="جنوب سيناء" index={20}>
                  جنوب سيناء
                </option>
                <option value="السويس" index={21}>
                  السويس
                </option>
                <option value="المنيا" index={22}>
                  المنيا
                </option>
                <option value="دمياط" index={23}>
                  دمياط
                </option>
                <option value="الشرقية" index={24}>
                  الشرقية
                </option>
                <option value="البحر الأحمر" index={25}>
                  البحر الأحمر
                </option>
                <option value="الوادي الجديد" index={26}>
                  الوادي الجديد
                </option>
              </select>
            </div>
            {/* City selection */}
            <div class="col-6">
              <label for="city" class="form-label">
                المدينه
              </label>
              <select
                class="form-select"
                id="city"
                disabled={!flag}
                required
          name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <option selected disabled value="">
                  اختر مدينه
                </option>
                {flag
                  ? city[index].map((el) => {
                      return <option value={el}>{el}</option>;
                    })
                  : null}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <label htmlFor="address" className="form-label">العنوان</label>
              <input
                className="mb-3 form-control"
                type="text"
                id="address"
                name="address"
                placeholder="العنوان"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <p className="text-danger">{errors.address}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="bod" className="form-label">تاريخ الميلاد</label>
              <input
                className="mb-3 form-control"
                type="date"
                id="bod"
                name="bod"
                placeholder="تاريخ الميلاد"
                value={formData.bod}
                onChange={handleChange}
                required
              />
              {errors.bod && <p className="text-danger">{errors.bod}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <label htmlFor="user_name" className="form-label">Username</label>
              <input
                className="mb-3 form-control"
                type="text"
                id="user_name"
                name="user_name"
                placeholder="Username"
                value={formData.user_name}
                onChange={handleChange}
                required
              />
              {errors.user_name && <p className="text-danger">{errors.user_name}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="password" className="form-label">ادخل الباسورد</label>
              <input
                className="mb-3 form-control"
                type="password"
                id="password"
                name="password"
                placeholder="ادخل الباسورد"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>
          </div>
          <div>
            <input
              className=""
              width={"fit-content"}
              type="checkbox"
              id="is_nurse"
              name="is_nurse"
              checked={formData.is_nurse}
              onChange={handleChange}
            />
            <label htmlFor="is_nurse" className="form-label">هل انت ممرض؟</label>
          </div>
          <br />
          {message && <div className="text-danger text-center fw-bold">{message}</div>}
          <Button className="m-auto d-block" type="submit">انشاء حساب</Button>
        </form>
        <AuthFooter text="هل لديك حساب بالفعل؟" linkText="تسجيل الدخول" to="/login" />
      </div>
    </div>
  );
};

export default Register;