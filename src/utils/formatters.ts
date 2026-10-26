// ქალაქების სახელების ლექსიკონი ინგლისურიდან ქართულზე
const cityTranslations: Record<string, string> = {
    'tbilisi': 'თბილისი',
    'rustavi': 'რუსთავი',
    'batumi': 'ბათუმი',
    'kutaisi': 'ქუთაისი',
    'gori': 'გორი',
    'gudauri': 'გუდაური',
    'zugdidi': 'ზუგდიდი',
    'telavi': 'თელავი',
    'mestia': 'მესტია',
    'mtskheta': 'მცხეთა',
    'surami': 'სურამი',
    'poti': 'ფოთი',
    'kobuleti': 'ქობულეთი',
    'ozurgeti': 'ოზურგეთი',
    'senaki': 'სენაკი',
    'abastumani': 'აბასთუმანი',
    'akhaltsikhe': 'ახალციხე',
    'bolnisi': 'ბოლნისი',
    'borjomi': 'ბორჯომი',
    'athens': 'ათენი',
    'antalya': 'ანტალია',
    'baku': 'ბაქო',
    'budapest': 'ბუდაპეშტი',
    'vienna': 'ვენა',
    'prague': 'პრაღა',
    'london': 'ლონდონი',
    'new york': 'ნიუ-იორკი',
    'paris': 'პარიზი',
    'istanbul': 'სტამბოლი',
    'zurich': 'ციურიხი',
};

// ამინდის მდგომარეობის ლექსიკონი ინგლისურიდან ქართულზე
export function translateCondition(desc: string): string {
    const mapping: Record<string, string> = {
        'clear sky': 'მოწმენდილი',
        'few clouds': 'მცირედით ღრუბლიანი',
        'scattered clouds': 'ცვალებადი ღრუბლიანობა',
        'broken clouds': 'ღრუბლიანი',
        'overcast clouds': 'მოღრუბლული',
        'light rain': 'მცირე წვიმა',
        'moderate rain': 'წვიმა',
        'heavy intensity rain': 'ძლიერი წვიმა',
        'rain': 'წვიმა',
        'thunderstorm': 'ჭექა-ქუხილი',
        'snow': 'თოვლი',
        'mist': 'ნისლი',
        'fog': 'ნისლი'
    };

    const key = desc.toLowerCase().trim();
    return mapping[key] || desc;
}

// ქალაქის სახელის გადაყვანა ქართულად
export function translateCityName(enName: string): string {
    const key = enName.toLowerCase().trim();
    return cityTranslations[key] || enName;
}

// ქალაქის დროისა და თარიღის გამოთვლა Timezone-ის მიხედვით
export function getCityDateTime(timezoneOffsetSeconds: number) {
    // ვიღებთ მიმდინარე UTC დროს მილიწამებში და ვუმატებთ არჩეული ქალაქის ოფსეტს (წამები გადაგვყავს მილიწამებში)
    const now = new Date();
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityDate = new Date(utcMs + (timezoneOffsetSeconds * 1000));

    //კვირისდღეების გადაყვანა ქართულად
    const weekdays = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'];
    const weekday = weekdays[cityDate.getDay()];

    // თვეების გადაყვანა ქართულად
    const months = [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
        'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];
    const month = months[cityDate.getMonth()];
    const day = now.getDate();

    const hours = String(cityDate.getHours()).padStart(2, '0');
    const minutes = String(cityDate.getMinutes()).padStart(2, '0');
    const seconds = String(cityDate.getSeconds()).padStart(2, '0');

    //დაბრუნებული ინფორმაციის გამოჩენა
    return {
        date: `${weekday}, ${day} ${month}`,
        time: `${hours}:${minutes}:${seconds}`
    };
}