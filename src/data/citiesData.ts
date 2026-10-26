//ქალაქების სახელების თარგმანი
export interface CityItem {
    name: string;
    query: string;
    temp: string | null;
}

export const geoCitiesList: CityItem[] = [
    { name: 'აბასთუმანი', query: 'Abastumani', temp: null },
    { name: 'ახალციხე', query: 'Akhaltsikhe', temp: null },
    { name: 'ბათუმი', query: 'Batumi', temp: null },
    { name: 'ბაკურიანი', query: 'Bakuriani', temp: null },
    { name: 'ბოლნისი', query: 'Bolnisi', temp: null },
    { name: 'ბორჯომი', query: 'Borjomi', temp: null },
    { name: 'გორი', query: 'Gori', temp: null },
    { name: 'გუდაური', query: 'Gudauri', temp: null },
    { name: 'ზუგდიდი', query: 'Zugdidi', temp: null },
    { name: 'თბილისი', query: 'Tbilisi', temp: null },
    { name: 'თელავი', query: 'Telavi', temp: null },
    { name: 'მესტია', query: 'Mestia', temp: null },
    { name: 'მცხეთა', query: 'Mtskheta', temp: null },
    { name: 'რუსთავი', query: 'Rustavi', temp: null },
    { name: 'სურამი', query: 'Surami', temp: null },
    { name: 'ქუთაისი', query: 'Kutaisi', temp: null },
    { name: 'ფოთი', query: 'Poti', temp: null },
    { name: 'ქობულეთი', query: 'Kobuleti', temp: null },
    { name: 'ოზურგეთი', query: 'Ozurgeti', temp: null },
    { name: 'სენაკი', query: 'Senaki', temp: null },
];

export const foreignCitiesList: CityItem[] = [
    { name: 'ათენი', query: 'Athens', temp: null },
    { name: 'ანტალია', query: 'Antalya', temp: null },
    { name: 'ბაქო', query: 'Baku', temp: null },
    { name: 'ბუდაპეშტი', query: 'Budapest', temp: null },
    { name: 'ვენა', query: 'Vienna', temp: null },
    { name: 'პრაღა', query: 'Prague', temp: null },
    { name: 'ლონდონი', query: 'London', temp: null },
    { name: 'ნიუ-იორკი', query: 'New York', temp: null },
    { name: 'პარიზი', query: 'Paris', temp: null },
    { name: 'სტამბოლი', query: 'Istanbul', temp: null },
    { name: 'ციურიხი', query: 'Zurich', temp: null },
];