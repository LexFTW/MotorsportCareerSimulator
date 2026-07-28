import type { PendingDecision } from '@/entities/seasons/models/seasonSlice';

import nutritionImage from '@shared/assets/images/nutrition.png';
import trainingImage from '@shared/assets/images/training.png';
import psychologyImage from '@shared/assets/images/psychology.png';
import interviewImage from '@shared/assets/images/interview.png';
import partyImage from '@shared/assets/images/party.png';
import overtakeImage from '@shared/assets/images/overtake.png';

export const PERSONAL_DECISIONS: PendingDecision[] = [
  {
    type: 'personalDecision',
    title: 'Cambio de nutrición',
    description: 'Tu nutricionista te propone un cambio de dieta para mejorar el rendimiento.',
    options: [
      {
        id: 'accept_diet',
        label: 'Aceptar cambio',
        description: 'Riesgo: puede salir bien o mal',
        image: nutritionImage,
        badges: {
          positive: { text: '+1 RAT', probability: 70 },
          negative: { text: '-2 RAT', probability: 30 },
        },
      },
      {
        id: 'reject_diet',
        label: 'Mantener rutina',
        description: 'Sin cambios en el rendimiento',
        badges: {
          positive: { text: '0', probability: 100 },
        },
      },
    ],
  },
  {
    type: 'personalDecision',
    title: 'Entrenamiento extra',
    description: 'Tu preparador físico te ofrece sesiones extra de entrenamiento.',
    options: [
      {
        id: 'accept_training',
        label: 'Aceptar entrenamiento extra',
        description: 'Puedes ganar resistencia, pero hay riesgo de lesión',
        image: trainingImage,
        badges: {
          positive: { text: '+1 RAT', probability: 80 },
          negative: { text: '-3 RAT (lesión)', probability: 20 },
        },
      },
      {
        id: 'reject_training',
        label: 'Descansar',
        description: 'Sin riesgos',
        badges: {
          positive: { text: '0', probability: 100 },
        },
      },
    ],
  },
  {
    type: 'personalDecision',
    title: 'Terapia psicológica',
    description: 'El equipo te ofrece sesiones con un psicólogo deportivo para mejorar tu concentración.',
    options: [
      {
        id: 'accept_psycho',
        label: 'Aceptar terapia',
        description: 'Puede mejorar tu consistencia en carrera',
        image: psychologyImage,
        badges: {
          positive: { text: '+2 RAT', probability: 60 },
          negative: { text: '-1 RAT', probability: 40 },
        },
      },
      {
        id: 'reject_psycho',
        label: 'Rechazar terapia',
        description: 'Te sientes bien mentalmente',
        badges: {
          positive: { text: '0', probability: 100 },
        },
      },
    ],
  },
  {
    type: 'personalDecision',
    title: 'Entrevista con la prensa',
    description: 'Un periodista te pide una entrevista exclusiva. ¿Qué haces?',
    options: [
      {
        id: 'accept_interview',
        label: 'Aceptar entrevista',
        description: 'Mejora tu popularidad, pero puede ser contraproducente',
        image: interviewImage,
        badges: {
          positive: { text: '+1 RAT', probability: 60 },
          negative: { text: '-1 RAT', probability: 40 },
        },
      },
      {
        id: 'reject_interview',
        label: 'Rechazar entrevista',
        description: 'Mantienes tu privacidad',
        badges: {
          positive: { text: '0', probability: 100 },
        },
      },
    ],
  },
  {
    type: 'personalDecision',
    title: 'Fiesta del equipo',
    description: 'El equipo celebra una fiesta después de un buen resultado. ¿Asistes?',
    options: [
      {
        id: 'attend_party',
        label: 'Asistir a la fiesta',
        description: 'Fortalecer lazos con el equipo, pero puedes llegar cansado',
        image: partyImage,
        badges: {
          positive: { text: '+1 RAT', probability: 80 },
          negative: { text: '-1 RAT', probability: 20 },
        },
      },
      {
        id: 'skip_party',
        label: 'Saltarse la fiesta',
        description: 'Descansar para la próxima carrera',
        badges: {
          positive: { text: '0', probability: 100 },
        },
      },
    ],
  },
  {
    type: 'personalDecision',
    title: 'Jugar al límite',
    description: 'En la última curva, ves una oportunidad de adelantamiento arriesgado.',
    options: [
      {
        id: 'take_risk',
        label: 'Intentar adelantamiento',
        description: 'Puedes ganar o perder varias posiciones',
        image: overtakeImage,
        badges: {
          positive: { text: '+3 RAT', probability: 40 },
          negative: { text: '-3 RAT', probability: 60 },
        },
      },
      {
        id: 'stay_safe',
        label: 'Mantener posición',
        description: 'Aseguras los puntos que tienes',
        badges: {
          positive: { text: '+1 RAT', probability: 90 },
          negative: { text: '-1 RAT', probability: 10 },
        },
      },
    ],
  },
];


export const TRANSFER_DECISIONS: Omit<PendingDecision, 'type'>[] = [
  {
    title: 'Oferta de escudería',
    description: 'Elige la escudería para la próxima temporada.',
    options: [
      { id: 1, teamId: 1, label: 'Mercedes', description: 'Equipo puntero' },
      { id: 2, teamId: 2, label: 'Ferrari', description: 'Equipo histórico' },
      { id: 3, teamId: 3, label: 'Red Bull', description: 'Equipo ganador' },
    ],
  },
  {
    title: 'Renovar contrato',
    description: 'Tu equipo actual te ofrece una renovación. ¿La aceptas?',
    options: [
      { id: 1, teamId: 1, label: 'Renovar', description: 'Continúas en el equipo' },
      { id: 2, teamId: 2, label: 'Buscar nuevos horizontes', description: 'Explorar otras opciones' },
    ],
  },
];