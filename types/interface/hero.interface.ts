export interface ISocialIcon {
  icon: React.ComponentType;
  label: string;
}


export interface ProjectImage {
  src: string;
  alt: string;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  images: ProjectImage[];
}
