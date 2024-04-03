import {
  Address,
  CalendarLength,
  ConditionProfile,
  ConditionProfileItem,
  Provider,
  Training,
  TrainingResult
} from "../domain/Training";
import { InDemandOccupation, Occupation, OccupationDetail } from "../domain/Occupation";

const randomInt = (): number => Math.floor(Math.random() * Math.floor(10000000));
const randomBool = (): boolean => !!Math.round(Math.random());

export const buildTrainingResult = (overrides: Partial<TrainingResult>): TrainingResult => {
  return {
    id: "some-id-" + randomInt(),
    name: "some-name-" + randomInt(),
    cipCode: "some-cip-" + randomInt(),
    totalCost: randomInt(),
    percentEmployed: randomInt(),
    calendarLength: randomCalendarLength(),
    totalClockHours: randomInt(),
    inDemand: randomBool(),
    localExceptionCounty: ["some-county-" + randomInt()],
    online: randomBool(),
    providerId: "some-id-" + randomInt(),
    providerName: "some-provider-name-" + randomInt(),
    cities: ["some-city-" + randomInt(), "some-city-" + randomInt()],
    zipCodes: ["some-zipcode-" + randomInt(), "some-zipcode-" + randomInt()],
    availableAt: {
      street_address: "",
      city: "",
      zipCode: ""
    },
    county: "some-county-" + randomInt(),
    highlight: "some-highlight-" + randomInt(),
    rank: randomInt(),
    socCodes: ["some-soc-" + randomInt()],
    hasEveningCourses: randomBool(),
    languages: ["some-language-" + randomInt()],
    isWheelchairAccessible: randomBool(),
    hasJobPlacementAssistance: randomBool(),
    hasChildcareAssistance: randomBool(),
    ...overrides,
  };
};

export const buildTraining = (overrides: Partial<Training>): Training => {
  return {
    id: "some-id-" + randomInt(),
    name: "some-name-" + randomInt(),
    cipCode: "some-cip-" + randomInt(),
    provider: buildProvider({}),
    calendarLength: randomCalendarLength(),
    totalClockHours: randomInt(),
    occupations: [buildOccupation({})],
    description: "some-description-" + randomInt(),
    certifications: [buildConditionProfile({}), buildConditionProfile({})],
    prerequisites: "some-certifications-" + randomInt(),
    inDemand: randomBool(),
    localExceptionCounty: ["some-county-" + randomInt()],
    tuitionCost: randomInt(),
    feesCost: randomInt(),
    booksMaterialsCost: randomInt(),
    suppliesToolsCost: randomInt(),
    otherCost: randomInt(),
    totalCost: randomInt(),
    online: randomBool(),
    percentEmployed: randomInt(),
    averageSalary: randomInt(),
    hasEveningCourses: randomBool(),
    languages: ["some-language-" + randomInt()],
    isWheelchairAccessible: randomBool(),
    hasJobPlacementAssistance: randomBool(),
    hasChildcareAssistance: randomBool(),
    ...overrides,
  };
};

export const buildProvider = (overrides: Partial<Provider>): Provider => {
  return {
    id: "some-id-" + randomInt(),
    name: "some-provider-name-" + randomInt(),
    email: "some-provider-email-" + randomInt() + "@FAKE-PROVIDER-DOMAIN.com",
    url: "some-url-" + randomInt(),
    addresses: [buildAddress({}), buildAddress({})],
    /*contactName: "some-contactName-" + randomInt(),
    contactTitle: "some-contactTitle-" + randomInt(),
    phoneNumber: "some-phoneNumber-" + randomInt(),
    phoneExtension: "some-phoneExtension-" + randomInt(),
    phoneExtension: "some-phoneExtension-" + randomInt(),
    county: "some-county-" + randomInt(),*/
    ...overrides,
  };
};

export const buildAddress = (overrides: Partial<Address>): Address => {
  return {
    name: "some-location-name-" + randomInt(),
    street1: "some-street1-" + randomInt(),
    street2: "some-street2-" + randomInt(),
    city: "some-city-" + randomInt(),
    state: "some-state-" + randomInt(),
    zipCode: "some-zipCode-" + randomInt(),
    targetContactPoints: [],
    ...overrides,
  };
};

export const buildInDemandOccupation = (
  overrides: Partial<InDemandOccupation>,
): InDemandOccupation => {
  return {
    soc: "some-soc-" + randomInt(),
    title: "some-title-" + randomInt(),
    majorGroup: "some-group-" + randomInt(),
    counties: ["ATLANTIC", "MERCER"],
    ...overrides,
  };
};

export const buildOccupation = (overrides: Partial<Occupation>): Occupation => {
  return {
    soc: "some-soc-" + randomInt(),
    title: "some-title-" + randomInt(),
    ...overrides,
  };
};

export const buildOccupationDetail = (overrides: Partial<OccupationDetail>): OccupationDetail => {
  return {
    soc: "some-soc-code-" + randomInt(),
    title: "some-title-" + randomInt(),
    description: "some-description-" + randomInt(),
    tasks: ["some-task-" + randomInt()],
    education: "some-eduction-text-" + randomInt(),
    inDemand: randomBool(),
    medianSalary: randomInt(),
    openJobsCount: randomInt(),
    relatedOccupations: [buildOccupation({})],
    relatedTrainings: [buildTrainingResult({})],
    ...overrides,
  };
};

export const buildConditionProfile = (overrides: Partial<ConditionProfile>): ConditionProfile => {
  return {
    name: "some-name-" + randomInt(),
    experience: "some-experience-" + randomInt(),
    description: "some-description-" + randomInt(),
    yearsOfExperience: randomInt(),
    targetAssessment: [buildConditionProfileItem({}), buildConditionProfileItem({}), buildConditionProfileItem({})],
    targetCompetency: [buildConditionProfileItem({}), buildConditionProfileItem({}), buildConditionProfileItem({})],
    targetCredential: [buildConditionProfileItem({}), buildConditionProfileItem({}), buildConditionProfileItem({})],
    targetLearningOpportunity: [buildConditionProfileItem({}), buildConditionProfileItem({}), buildConditionProfileItem({})],
    ...overrides,
  };
}

export const buildConditionProfileItem = (overrides: Partial<ConditionProfileItem>): ConditionProfileItem => {
  return {
    name: "some-name-" + randomInt(),
    provider: buildProvider({}),
    description: "some-description-" + randomInt(),
    ...overrides,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const randomCalendarLength = (): CalendarLength => {
  const all: number[] = Object.keys(CalendarLength)
    .filter((k) => typeof CalendarLength[k as any] === "number")
    .map((key) => key as any);
  const randomIndex = Math.floor(Math.random() * all.length);
  return all[randomIndex];
};
