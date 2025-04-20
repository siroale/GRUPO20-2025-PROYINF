import { useState } from 'react';
import { 
  Code, Briefcase, Palette, Coffee, Star, Award, Database, Globe,
  BookOpen, Brain, Server, Zap, Cloud, Shield, Archive,
  Rocket, Bug, Cpu, Layers, FileCode, Users, Heart, LineChart, FileText
} from 'lucide-react';

// Componente Badge ampliado con más tipos
const Badge = ({ type, label }) => {
  const getBadgeStyles = () => {
    const styles = {
      // Badges
      admin: "bg-black text-white",
      coffee: "bg-amber-800 text-white",
      monster: "bg-green-800 text-white",
      spaceship: "bg-indigo-800 text-white",
      developer: "bg-blue-600 text-white",
      designer: "bg-purple-600 text-white",
      founder: "bg-green-600 text-white",
      backend: "bg-indigo-600 text-white",
      frontend: "bg-pink-600 text-white",
      fullstack: "bg-amber-600 text-white",
      support: "bg-cyan-600 text-white",
      devops: "bg-red-600 text-white",
      qa: "bg-emerald-600 text-white",
      scrum: "bg-orange-600 text-white",
      cloud: "bg-sky-600 text-white",
      security: "bg-slate-600 text-white",
      architecture: "bg-violet-600 text-white",
      ai: "bg-fuchsia-600 text-white",
      data: "bg-teal-600 text-white",
      mentor: "bg-lime-600 text-white",
      lead: "bg-yellow-600 text-white",
      docs: "bg-stone-600 text-white",
      performance: "bg-blue-500 text-white",
      product: "bg-green-500 text-white",
      research: "bg-purple-500 text-white"
    };
    
    return styles[type] || "bg-gray-600 text-white";
  };
  
  const getIcon = () => {
    switch(type) {
      // Iconos originales
      case 'admin': return <Star className="w-3 h-3 mr-1" />;
      case 'coffee': return <Coffee className="w-3 h-3 mr-1" />;
      case 'monster': return <Zap className="w-3 h-3 mr-1" />;
      case 'spaceship': return <Rocket className="w-3 h-3 mr-1" />;
      case 'developer': return <Code className="w-3 h-3 mr-1" />;
      case 'database': return <Code className="w-3 h-3 mr-1" />;
      case 'designer': return <Palette className="w-3 h-3 mr-1" />;
      case 'founder': return <Award className="w-3 h-3 mr-1" />;
      case 'backend': return <Database className="w-3 h-3 mr-1" />;
      case 'frontend': return <Coffee className="w-3 h-3 mr-1" />;
      case 'fullstack': return <Code className="w-3 h-3 mr-1" />;
      case 'support': return <Globe className="w-3 h-3 mr-1" />;
      case 'devops': return <Server className="w-3 h-3 mr-1" />;
      case 'qa': return <Bug className="w-3 h-3 mr-1" />;
      case 'scrum': return <Users className="w-3 h-3 mr-1" />;
      case 'cloud': return <Cloud className="w-3 h-3 mr-1" />;
      case 'security': return <Shield className="w-3 h-3 mr-1" />;
      case 'architecture': return <Layers className="w-3 h-3 mr-1" />;
      case 'ai': return <Brain className="w-3 h-3 mr-1" />;
      case 'data': return <LineChart className="w-3 h-3 mr-1" />;
      case 'mentor': return <BookOpen className="w-3 h-3 mr-1" />;
      case 'lead': return <Briefcase className="w-3 h-3 mr-1" />;
      case 'docs': return <FileText className="w-3 h-3 mr-1" />;
      case 'performance': return <Zap className="w-3 h-3 mr-1" />;
      case 'product': return <Archive className="w-3 h-3 mr-1" />;
      case 'research': return <Heart className="w-3 h-3 mr-1" />;
      default: return <Star className="w-3 h-3 mr-1" />;
    }
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getBadgeStyles()}`}>
      {getIcon()}
      {label}
    </span>
  );
};

// Componente para la tarjeta de presentación
const ProfileCard = ({ image, name, description, badges = [] }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex-shrink-0">
        <img 
          src={image || "/api/placeholder/100/100"} 
          alt={`Foto de ${name}`}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" 
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <Badge key={index} type={badge.type} label={badge.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function About() {
  // Datos para las tarjetas de presentación con badges
  const teamMembers = [
    {
      id: 1,
      name: "Lucas Mosquera",
      description: "Lead Developer y Fundador",
      image: "/media/about/lucas.png",
      badges: [
        { type: "scrum", label: "SCRUM" },
        { type: "founder", label: "Fundador" },
        { type: "fullstack", label: "Full Stack" },
        { type: "coffee", label: "Coffee" },
      ]
    },
    {
      id: 2,
      name: "Alexis Mellis",
      description: "Fullstack Developer",
      image: "/media/about/alexis.png",
      badges: [
        { type: "fullstack", label: "Full Stack" },
        { type: "designer", label: "UI" },
        { type: "database", label: "Database" },
        { type: "monster", label: "Monsterinii" },
      ]
    },
    {
      id: 3,
      name: "Andrés Águila",
      description: "Backend Developer",
      image: "/media/about/andres.png",
      badges: [
        { type: "backend", label: "Backend" },
        { type: "ai", label: "IA" },
        { type: "research", label: "Research" },
        { type: "database", label: "Database" },
      ]
    },
    {
      id: 4,
      name: "Joaquín Domínguez",
      description: "Frontend Developer",
      image: "/media/about/joaquin.png",
      badges: [
        { type: "frontend", label: "Frontend" },
        { type: "designer", label: "UX/UI" },
        { type: "data", label: "Data" },
        { type: "spaceship", label: "Rocket Fuel" },
        
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Acerca de KESSOFT</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Nuestra Misión</h3>
        <p className="text-base mb-8">
          En KESSOFT nos dedicamos a crear aplicaciones web innovadoras (mientras sufrimos y no nos pagan) y de alta calidad que resuelvan problemas reales (mentira).
          Utilizamos tecnologías modernas como Django, React y Docker para ofrecer soluciones eficientes y escalables (eso si es verdad).
        </p>
      
      
        <h3 className="text-xl font-semibold mb-4">Nuestro Equipo</h3>

        <div className="grid gap-4 md:grid-cols-2">
          {teamMembers.map((member) => (
            <ProfileCard
              key={member.id}
              name={member.name}
              description={member.description}
              image={member.image}
              badges={member.badges}
            />
          ))}
        </div>
      </div>
    </div>
  );
}