export interface SubtopicCard {
  id: string;
  category: string;
  title: string;
  elements: Element[];
}

export type MasteryStatus = 'not-started' | 'in-progress' | 'mastered';

export interface StudyProgress {
  [cardId: string]: MasteryStatus;
}

export class StudyDeckEngine {
  private cards: SubtopicCard[] = [];
  private activeDeck: SubtopicCard[] = [];
  private currentIndex: number = 0;
  private progress: StudyProgress = {};
  private lessonSlug: string = '';
  private currentCategory: string = 'all';
  private hideMastered: boolean = false;

  constructor() {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname;
    this.lessonSlug = path.split('/').filter(Boolean).pop() || 'default-lesson';
    this.loadProgress();
  }

  public init() {
    const main = document.querySelector('.lesson-content-cards');
    if (!main) return;

    this.extractSubtopics(main);
    this.setupCategoryFilter();
    this.setupEventListeners();
    this.applyFilters();
    this.updateStats();
  }

  private extractSubtopics(container: Element) {
    const children = Array.from(container.children);
    let currentCategory = 'General';

    this.cards = [];
    let currentCard: SubtopicCard | null = null;

    children.forEach((child) => {
      if (child.tagName === 'H2') {
        currentCategory = child.textContent?.trim() || 'General';
      } else if (child.tagName === 'H3') {
        if (currentCard) {
          this.cards.push(currentCard);
        }
        const title = child.textContent?.trim() || 'Subtopic';
        const id = `${this.lessonSlug}_${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        
        currentCard = {
          id,
          category: currentCategory,
          title,
          elements: [child.cloneNode(true) as Element]
        };
      } else if (currentCard) {
        currentCard.elements.push(child.cloneNode(true) as Element);
      }
    });

    if (currentCard) {
      this.cards.push(currentCard);
    }
  }

  private loadProgress() {
    try {
      const stored = localStorage.getItem(`icho-rev-progress-${this.lessonSlug}`);
      if (stored) {
        this.progress = JSON.parse(stored);
      }
    } catch (e) {}
  }

  private saveProgress() {
    try {
      localStorage.setItem(`icho-rev-progress-${this.lessonSlug}`, JSON.stringify(this.progress));
    } catch (e) {}
  }

  public getStatus(cardId: string): MasteryStatus {
    return this.progress[cardId] || 'not-started';
  }

  public setStatus(cardId: string, status: MasteryStatus) {
    this.progress[cardId] = status;
    this.saveProgress();
    this.updateStats();
    this.renderActiveCard();
  }

  private setupCategoryFilter() {
    const select = document.getElementById('study-category-select') as HTMLSelectElement;
    if (!select) return;

    const categories = Array.from(new Set(this.cards.map((c) => c.category)));
    select.innerHTML = `<option value="all">All Categories (${this.cards.length})</option>`;
    
    categories.forEach((cat) => {
      const count = this.cards.filter((c) => c.category === cat).length;
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = `${cat} (${count})`;
      select.appendChild(opt);
    });

    select.addEventListener('change', (e) => {
      this.currentCategory = (e.target as HTMLSelectElement).value;
      this.applyFilters();
    });
  }

  private setupEventListeners() {
    document.getElementById('study-prev-btn')?.addEventListener('click', () => this.prevCard());
    document.getElementById('study-next-btn')?.addEventListener('click', () => this.nextCard());
    
    document.getElementById('study-mark-mastered-btn')?.addEventListener('click', () => {
      const activeCard = this.activeDeck[this.currentIndex];
      if (activeCard) {
        this.setStatus(activeCard.id, 'mastered');
        this.nextCard();
      }
    });

    document.getElementById('study-reset-card-btn')?.addEventListener('click', () => {
      const activeCard = this.activeDeck[this.currentIndex];
      if (activeCard) {
        this.setStatus(activeCard.id, 'not-started');
      }
    });

    document.getElementById('study-shuffle-btn')?.addEventListener('click', () => this.shuffle());

    const hideCheck = document.getElementById('study-hide-mastered') as HTMLInputElement;
    hideCheck?.addEventListener('change', (e) => {
      this.hideMastered = (e.target as HTMLInputElement).checked;
      this.applyFilters();
    });
  }

  public applyFilters() {
    this.activeDeck = this.cards.filter((card) => {
      const matchesCategory = this.currentCategory === 'all' || card.category === this.currentCategory;
      const matchesMastered = !this.hideMastered || this.getStatus(card.id) !== 'mastered';
      return matchesCategory && matchesMastered;
    });

    this.currentIndex = 0;
    this.renderActiveCard();
  }

  public shuffle() {
    for (let i = this.activeDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.activeDeck[i], this.activeDeck[j]] = [this.activeDeck[j], this.activeDeck[i]];
    }
    this.currentIndex = 0;
    this.renderActiveCard();
  }

  public prevCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderActiveCard();
    }
  }

  public nextCard() {
    if (this.currentIndex < this.activeDeck.length - 1) {
      this.currentIndex++;
      this.renderActiveCard();
    }
  }

  private renderActiveCard() {
    const cardContent = document.getElementById('study-card-content');
    const categoryBadge = document.getElementById('study-card-category');
    const statusPill = document.getElementById('study-card-status-pill');
    const progressText = document.getElementById('study-card-progress-text');
    const progressBar = document.getElementById('study-card-progress-bar');
    const prevBtn = document.getElementById('study-prev-btn') as HTMLButtonElement;
    const nextBtn = document.getElementById('study-next-btn') as HTMLButtonElement;

    if (!cardContent) return;
    cardContent.innerHTML = '';

    if (this.activeDeck.length === 0) {
      cardContent.innerHTML = `<div class="text-center py-12 text-foreground/60"><p class="text-base font-semibold">No subtopics available in this view.</p><p class="text-xs mt-1">Try unchecking "Hide Mastered" or selecting another category.</p></div>`;
      if (categoryBadge) categoryBadge.textContent = 'Complete';
      if (statusPill) statusPill.textContent = 'Done';
      if (progressText) progressText.textContent = '0 of 0';
      if (progressBar) progressBar.style.width = '100%';
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      return;
    }

    const card = this.activeDeck[this.currentIndex];
    const status = this.getStatus(card.id);

    if (status === 'not-started') {
      this.progress[card.id] = 'in-progress';
      this.saveProgress();
      this.updateStats();
    }

    card.elements.forEach((el) => {
      cardContent.appendChild(el.cloneNode(true));
    });

    if (categoryBadge) categoryBadge.textContent = card.category;
    
    if (statusPill) {
      const currentStatus = this.getStatus(card.id);
      statusPill.textContent = currentStatus === 'mastered' ? 'Mastered' : 'In Progress';
      statusPill.className = currentStatus === 'mastered'
        ? 'text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
        : 'text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30';
    }

    if (progressText) {
      progressText.textContent = `Card ${this.currentIndex + 1} of ${this.activeDeck.length}`;
    }

    if (progressBar) {
      const percent = ((this.currentIndex + 1) / this.activeDeck.length) * 100;
      progressBar.style.width = `${percent}%`;
    }

    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex === this.activeDeck.length - 1;
  }

  public updateStats() {
    const total = this.cards.length;
    let mastered = 0;
    let inProgress = 0;
    let notStarted = 0;

    this.cards.forEach((card) => {
      const status = this.getStatus(card.id);
      if (status === 'mastered') mastered++;
      else if (status === 'in-progress') inProgress++;
      else notStarted++;
    });

    const statTotal = document.getElementById('stat-total');
    const statMastered = document.getElementById('stat-mastered');
    const statInProgress = document.getElementById('stat-in-progress');
    const statNotStarted = document.getElementById('stat-not-started');

    if (statTotal) statTotal.textContent = String(total);
    if (statMastered) statMastered.textContent = String(mastered);
    if (statInProgress) statInProgress.textContent = String(inProgress);
    if (statNotStarted) statNotStarted.textContent = String(notStarted);
  }
}

let engineInstance: StudyDeckEngine | null = null;

export function getStudyEngine(): StudyDeckEngine {
  if (!engineInstance) {
    engineInstance = new StudyDeckEngine();
  }
  return engineInstance;
}

if (typeof document !== 'undefined') {
  if (document.readyState !== 'loading') {
    getStudyEngine().init();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      getStudyEngine().init();
    });
  }
}
